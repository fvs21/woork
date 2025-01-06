package org.woork.backend.posting;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import org.woork.backend.address.AddressRepository;
import org.woork.backend.address.AddressResource;
import org.woork.backend.address.records.LocationQuery;
import org.woork.backend.authentication.AuthenticationService;
import org.woork.backend.exceptions.exceptions.*;
import org.woork.backend.image.Image;
import org.woork.backend.image.ImageService;
import org.woork.backend.address.Address;
import org.woork.backend.address.AddressService;
import org.woork.backend.notification.NotificationService;
import org.woork.backend.notification.models.NotificationType;
import org.woork.backend.notification.records.NotificationData;
import org.woork.backend.pendingjob.PendingJob;
import org.woork.backend.pendingjob.PendingJobService;
import org.woork.backend.pendingjob.resources.HostPendingJobResource;
import org.woork.backend.posting.records.AcceptJobApplicationResponse;
import org.woork.backend.posting.records.PostingLocation;
import org.woork.backend.posting.records.PostingResponse;
import org.woork.backend.posting.requests.PostingLocationRequest;
import org.woork.backend.posting.requests.CreatePostingRequest;
import org.woork.backend.posting.resources.PostingResource;
import org.woork.backend.postingapplication.PostingApplication;
import org.woork.backend.postingapplication.PostingApplicationRepository;
import org.woork.backend.postingapplication.Status;
import org.woork.backend.postingapplication.resources.ApplicantResource;
import org.woork.backend.url.UrlService;
import org.woork.backend.user.User;
import org.woork.backend.validators.ValidatorImpl;
import org.woork.backend.worker.models.Worker;
import org.woork.backend.worker.WorkerService;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class PostingService {
    private static final Log log = LogFactory.getLog(PostingService.class);
    private final PostingRepository postingRepository;
    private final AddressService addressService;
    private final AddressRepository addressRepository;
    private final ImageService imageService;
    private final UrlService urlService;
    private final ValidatorImpl validator;
    private final PostingApplicationRepository postingApplicationRepository;
    private final NotificationService notificationService;
    private final AuthenticationService authenticationService;
    private final WorkerService workerService;
    private final PendingJobService pendingJobService;

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    public PostingService(
            PostingRepository postingRepository,
            AddressService addressService,
            AddressRepository addressRepository,
            ImageService imageService,
            UrlService urlService,
            ValidatorImpl validator,
            PostingApplicationRepository postingApplicationRepository,
            NotificationService notificationService,
            AuthenticationService authenticationService,
            WorkerService workerService,
            PendingJobService pendingJobService) {
        this.postingRepository = postingRepository;
        this.addressService = addressService;
        this.addressRepository = addressRepository;
        this.imageService = imageService;
        this.urlService = urlService;
        this.validator = validator;
        this.postingApplicationRepository = postingApplicationRepository;
        this.notificationService = notificationService;
        this.authenticationService = authenticationService;
        this.workerService = workerService;
        this.pendingJobService = pendingJobService;
    }

    private CreatePostingRequest decodeJson(String body) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(body, CreatePostingRequest.class);
        } catch (JsonProcessingException e) {
            log.error(e.getMessage());
            throw new UnableToCreatePostingException();
        }
    }

    public Address getLocationForPosting(User author, PostingLocationRequest locationRequest) {
        PostingLocation location = locationRequest.getLocation();
        validator.validateFields(location);


        if(!locationRequest.isCreate()) {
            if(location.id() == null)
                throw new UnableToCreatePostingException("Forbidden action.");

            Long locId = location.id();

            if(!Objects.equals(author.getAddress().getId(), locId)) {
                Set<Posting> userLocations = postingRepository.findByAuthor_Id(author.getId()).orElse(new HashSet<>());

                if(userLocations.stream().noneMatch(posting -> posting.getAddress().getId().equals(locId))) {
                    throw new UnableToCreatePostingException("Forbidden action. Invalid location id.");
                }
            }

            Address addressObject = addressRepository.findById(locId).orElseThrow(() -> new UnableToCreatePostingException("Forbidden action. Invalid location id."));

            if(addressObject.getLatitude() == null || addressObject.getLongitude() == null) {
                if(location.latitude() == null || location.longitude() == null) {
                    throw new UnableToCreatePostingException("Latitude and longitude required");
                }

                addressService.storeCoordinates(addressObject, location.latitude().doubleValue(), location.longitude().doubleValue());
            }

            return addressObject;
        } else {
            if(location.latitude() == null || location.longitude() == null) {
                throw new UnableToCreatePostingException("Latitude and longitude required.");
            }

            try {
                return addressService.createAddress(location);
            } catch(InvalidLocationException e) {
                throw new UnableToCreatePostingException(e.getMessage());
            }
        }
    }

    public PostingResource createPosting(User author, String body, List<MultipartFile> images) {
        CreatePostingRequest createPostingRequest = decodeJson(body);
        PostingLocationRequest addressRequest = createPostingRequest.getLocation();
        validator.validateFields(createPostingRequest);
        validator.validateFields(addressRequest);
        if(images.size() > 3)
            throw new UnableToCreatePostingException("Image upload size exceeded.");

        if(author.getAddress() == null)
            throw new UnableToCreatePostingException("Debes agregar tu dirección.");

        Address postingLocation = getLocationForPosting(author, addressRequest);

        Posting posting = new Posting();
        posting.setTitle(createPostingRequest.getTitle());
        posting.setDescription(createPostingRequest.getDescription());
        posting.setCategory(createPostingRequest.getCategory());
        posting.setPrice(createPostingRequest.getPrice());
        posting.setAddress(postingLocation);
        posting.setAuthor(author);

        Set<Image> imagesObjects = new HashSet<>();
        for(MultipartFile image : images) {
            Image img = imageService.uploadImage(image, "postings");
            imagesObjects.add(img);
        }
        posting.setImages(imagesObjects);
        postingRepository.save(posting);

        String url = urlService.encodeIdToUrl(posting.getId());

        return new PostingResource(posting, url);
    }

    public Set<Image> getPostingImages(Long postingId) {
        Posting posting = postingRepository.findById(postingId).orElse(null);
        if(posting == null) {
            throw new PostingDoesNotExistException();
        }

        return posting.getImages();
    }

    public PostingResponse getPostingByHashId(String hashId) {
        Long postingId = urlService.decodeIdFromUrl(hashId).get(0);

        Posting posting = postingRepository.findById(postingId).orElseThrow(PostingDoesNotExistException::new);
        boolean postingAvailable = isJobAvailable(posting);

        if(authenticationService.isUserAuthenticated()) {
            User user = authenticationService.getCurrentUser();

            if(!postingAvailable && (!posting.belongsToUser(user) && !pendingJobService.userIsWorkerInPosting(user, posting)))
                throw new PostingDoesNotExistException();

            if(user.isWorker()) {
                Worker worker = workerService.getWorker(user);
                String status = getUsersPostingApplicationStatus(worker.getId(), postingId);

                return new PostingResponse(
                        getPostingResource(postingId),
                        status
                );
            }
        } else {
            if(!postingAvailable)
                throw new PostingDoesNotExistException();
        }

        return new PostingResponse(
                getPostingResource(postingId),
                ""
        );
    }

    public PostingResource getPostingResource(Long id) {
        Posting posting = postingRepository.findPostingById(id).orElseThrow(PostingDoesNotExistException::new);
        String url = urlService.encodeIdToUrl(posting.getId());

        return new PostingResource(posting, url);
    }

    public String deletePosting(String hashId, User user) {
        Long id;
        try {
            id = urlService.decodeIdFromUrl(hashId).get(0);
        } catch(Exception e) {
            throw new PostingDoesNotExistException();
        }

        if(hashId == null)
            throw new PostingDoesNotExistException();

        Posting posting = postingRepository.findPostingById(id).orElseThrow(PostingDoesNotExistException::new);

        if(!posting.getAuthor().getId().equals(user.getId())) {
            throw new UnableToDeletePostingException("Forbidden action.");
        }

        Set<Image> images = posting.getImages();
        for(Image image : images) {
            imageService.deleteImage(image);
        }

        postingRepository.delete(posting);
        return "Publicación eliminada";
    }

    public Set<PostingResource> getPostingsByUser(User user) {
        Set<Posting> postings = postingRepository.findByAuthor(user).orElse(new HashSet<>());

        Set<PostingResource> postingResources = new HashSet<>();
        for(Posting posting : postings) {
            String url = urlService.encodeIdToUrl(posting.getId());
            postingResources.add(new PostingResource(posting, url));
        }

        return postingResources;
    }

    public boolean isJobAvailable(Long postingId) {
        return !postingApplicationRepository.existsByPostingIdAndStatus(postingId, Status.ACCEPTED.toString());
    }

    private boolean isJobAvailable(Posting posting) {
        return !pendingJobService.pendingJobExistForPosting(posting);
    }

    public String getUsersPostingApplicationStatus(Long userId, Long postingId) {
        if(userId == null)
            return "";

        PostingApplication application = postingApplicationRepository.findByPostingIdAndWorkerId(postingId, userId).orElse(null);
        if(application == null)
            return null;

        return application.getStatus();
    }

    public PostingApplication createJobRequest(Worker worker, Posting posting) {
        PostingApplication postingApplication = new PostingApplication(
                posting,
                worker
        );
        return postingApplicationRepository.save(postingApplication);
    }

    public String applyToJob(User user, String hashId) {
        Long postingId = urlService.decodeIdFromUrl(hashId).get(0);

        if (!isJobAvailable(postingId)) {
            throw new UnableToApplyToJobException("Job is no longer available.");
        }

        //Get worker entity. Is user has not registered as a worker, the exception is handled in the getWorker method.
        Worker worker = workerService.getWorker(user);

        PostingApplication application = postingApplicationRepository.findByPostingIdAndWorkerId(postingId, worker.getId()).orElse(null);
        Posting posting = postingRepository.findPostingById(postingId).orElseThrow(PostingDoesNotExistException::new);

        if (application != null) {
            if (application.isRejected()) {
                throw new UnableToApplyToJobException("Job is rejected.");
            } else if (application.isAccepted()) {
                throw new UnableToApplyToJobException("Job is accepted.");
            } else {
                postingApplicationRepository.delete(application);
                return "Solicitud cancelada";
            }
        } else {
            PostingApplication request = createJobRequest(worker, posting);
            notificationService.createAndSendNotification(
                    user,
                    new NotificationData(
                            NotificationType.JOB_APPLICATION,
                            List.of(posting.getAuthor()),
                            posting,
                            postingId
                    )
            );
            return request.getStatus();
        }
    }

    //filter all postings by coordinates and a radius, specified by the user
    //Also filtering the unavailable jobs
    public List<PostingResource> filterPostingsByLocationAndCategory(LocationQuery coordinates, String category) {
        List<Address> filteredAddresses = addressService.filterLocationsByCoords(coordinates);

        List<Posting> filteredPostings = new ArrayList<>();

        filteredAddresses.forEach(address -> {
            List<Posting> filtered = postingRepository.findPostingsByAddressAndCategory(address, category).orElse(new ArrayList<>())
                    .stream().filter(this::isJobAvailable).toList();

            filteredPostings.addAll(filtered);
        });

        return filteredPostings.stream().map(filtered -> new PostingResource(filtered, urlService.encodeIdToUrl(filtered.getId()))).collect(Collectors.toList());
    }

    //filter all postings by category.
    //Also filtering the unavailable jobs
    public List<PostingResource> filterPostingsByCategory(String category) {
        List<Posting> postings = postingRepository
                .findAllByCategory(category)
                .orElse(new ArrayList<>());

        return postings.stream().filter(this::isJobAvailable).map(posting -> {
            String url = urlService.encodeIdToUrl(posting.getId());
            return new PostingResource(posting, url);
        }).toList();
    }

    public List<ApplicantResource> getJobPostingApplicants(User user, String hashId) {
        Long postingId = urlService.decodeIdFromUrl(hashId).get(0);

        Posting posting = postingRepository.findPostingById(postingId).orElseThrow(PostingDoesNotExistException::new);

        if(!posting.belongsToUser(user)){
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Forbidden"
            );
        }

        List<PostingApplication> applications = posting.getPostingApplications();
        return applications.stream().map(
                application -> {
                    Worker applicant = application.getWorker();
                    return new ApplicantResource(applicant);
                }
        ).toList();
    }

    public AcceptJobApplicationResponse acceptJobApplicantRequest(User creator, Long applicantId, String postingHashId) {
        Long postingId;

        try {
            postingId = urlService.decodeIdFromUrl(postingHashId).get(0);
        } catch(IndexOutOfBoundsException e) {
            throw new UnableToParseIdException();
        }

        Posting posting = postingRepository.findPostingById(postingId).orElseThrow(PostingDoesNotExistException::new);
        if(!posting.belongsToUser(creator)) {
            throw new UnableToAcceptApplicantException("Forbidden action.");
        }

        if(!isJobAvailable(postingId)) {
            throw new UnableToApplyToJobException("Job is no longer available.");
        }

        Worker applicant = workerService.getWorkerById(applicantId);
        PostingApplication application = postingApplicationRepository.findByPostingIdAndWorkerId(postingId, applicant.getId()).orElseThrow(
                () -> new UnableToApplyToJobException("Posting application does not exist.")
        );
        application.acceptApplication();

        PendingJob createdJob = pendingJobService.createJobSession(creator, applicant, posting);
        Long establishedJobSessionsCount = pendingJobService.getPendingJobCount(creator);

        return new AcceptJobApplicationResponse(
                new HostPendingJobResource(createdJob, postingHashId),
                establishedJobSessionsCount
        );
    }

    public Set<AddressResource> getUserCreatedAddresses(User user) {
        Set<Posting> postings = postingRepository.findByAuthor(user).orElse(new HashSet<>());

        return postings.stream().filter(
                posting -> !Objects.equals(posting.getAddress().getId(), user.getAddress().getId())
        ).map(
                posting -> {
                    Address address = posting.getAddress();
                    return new AddressResource(address);
                }
        ).collect(Collectors.toSet());
    }

    public Set<PostingResource> getUserCreatedPostings(User user) {
        Set<Posting> postings = postingRepository.findByAuthor(user).orElse(new HashSet<>());

        return postings.stream().map(
                posting -> {
                    String hashId = urlService.encodeIdToUrl(posting.getId());
                    return new PostingResource(posting, hashId);
                }
        ).collect(Collectors.toSet());
    }
}
