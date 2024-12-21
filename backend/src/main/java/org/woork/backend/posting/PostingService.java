package org.woork.backend.posting;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.woork.backend.address.AddressRepository;
import org.woork.backend.address.AddressResource;
import org.woork.backend.address.records.LocationQuery;
import org.woork.backend.authentication.AuthenticationService;
import org.woork.backend.exceptions.*;
import org.woork.backend.image.Image;
import org.woork.backend.image.ImageService;
import org.woork.backend.address.Address;
import org.woork.backend.address.AddressService;
import org.woork.backend.notification.NotificationService;
import org.woork.backend.notification.NotificationType;
import org.woork.backend.notification.records.NotificationData;
import org.woork.backend.posting.records.PostingLocation;
import org.woork.backend.posting.records.PostingResponse;
import org.woork.backend.posting.requests.PostingLocationRequest;
import org.woork.backend.posting.requests.CreatePostingRequest;
import org.woork.backend.posting.resources.PostingResource;
import org.woork.backend.postingapplication.PostingApplication;
import org.woork.backend.postingapplication.PostingApplicationRepository;
import org.woork.backend.postingapplication.Status;
import org.woork.backend.url.UrlService;
import org.woork.backend.user.User;
import org.woork.backend.user.UserService;
import org.woork.backend.validators.ValidatorImpl;

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
    private final UserService userService;
    private final NotificationService notificationService;
    private final AuthenticationService authenticationService;

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
            PostingApplicationRepository postingApplicationRepository, UserService userService, NotificationService notificationService, AuthenticationService authenticationService) {
        this.postingRepository = postingRepository;
        this.addressService = addressService;
        this.addressRepository = addressRepository;
        this.imageService = imageService;
        this.urlService = urlService;
        this.validator = validator;
        this.postingApplicationRepository = postingApplicationRepository;
        this.userService = userService;
        this.notificationService = notificationService;
        this.authenticationService = authenticationService;
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

        if(authenticationService.isUserAuthenticated()) {
            User user = authenticationService.getCurrentUser();
            String status = getUsersPostingApplicationStatus(user.getId(), postingId);

            return new PostingResponse(
                    getPosting(postingId),
                    status
            );
        }

        return new PostingResponse(
                getPosting(postingId),
                ""
        );
    }

    public PostingResource getPosting(Long id) {
        Posting posting = postingRepository.findPostingById(id).orElseThrow(PostingDoesNotExistException::new);
        String url = urlService.encodeIdToUrl(posting.getId());

        return new PostingResource(posting, url);
    }

    public void deletePosting(Long id, User user) {
        if(id == null)
            throw new PostingDoesNotExistException();

        Posting posting = postingRepository.findPostingById(id).orElse(null);
        if(posting == null) {
            throw new PostingDoesNotExistException();
        }

        if(!posting.getAuthor().getId().equals(user.getId())) {
            throw new UnableToDeletePostingException("Forbidden action.");
        }

        Set<Image> images = posting.getImages();
        for(Image image : images) {
            imageService.deleteImage(image);
        }

        postingRepository.delete(posting);
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
        PostingApplication postingApplication = postingApplicationRepository.findByPostingIdAndStatus(postingId, Status.ACCEPTED.toString()).orElse(null);
        return postingApplication == null;
    }

    public String getUsersPostingApplicationStatus(Long userId, Long postingId) {
        if(userId == null)
            return "";

        PostingApplication application = postingApplicationRepository.findByPostingIdAndUserId(postingId, userId).orElse(null);
        if(application == null)
            return null;

        return application.getStatus();
    }

    public PostingApplication createJobRequest(User user, Posting posting) {
        PostingApplication postingApplication = new PostingApplication(
                posting,
                user
        );
        return postingApplicationRepository.save(postingApplication);
    }

    public String applyToJob(User user, String hashId) {
        Long postingId = urlService.decodeIdFromUrl(hashId).get(0);

        if(!isJobAvailable(postingId)) {
            throw new UnableToApplyToJobException("Job is no longer available.");
        }

        PostingApplication application = postingApplicationRepository.findByPostingIdAndUserId(postingId, user.getId()).orElse(null);
        Posting posting = postingRepository.findPostingById(postingId).orElseThrow(PostingDoesNotExistException::new);

        if(application != null) {
            if(application.isRejected()) {
                throw new UnableToApplyToJobException("Job is rejected.");
            } else if(application.isAccepted()) {
                throw new UnableToApplyToJobException("Job is accepted.");
            }
            else {
                postingApplicationRepository.delete(application);
                return "Solicitud cancelada";
            }
        } else {
            PostingApplication request = createJobRequest(user, posting);
            notificationService.createAndSendNotification(
                    user,
                    new NotificationData(
                            NotificationType.JOB_APPLICATION,
                            List.of(posting.getAuthor()),
                            postingId
                    )
            );
            return request.getStatus();
        }
    }

    public List<PostingResource> filterPostingsByLocationAndCategory(LocationQuery coordinates, String category) {
        List<Address> filteredAddresses = addressService.filterLocationsByCoords(coordinates);

        List<Posting> filteredPostings = new ArrayList<>();

        filteredAddresses.forEach(address -> {
            List<Posting> filtered = postingRepository.findPostingsByAddressAndCategory(address, category).orElse(new ArrayList<>());
            filteredPostings.addAll(filtered);
        });

        return filteredPostings.stream().map(filtered -> new PostingResource(filtered, urlService.encodeIdToUrl(filtered.getId()))).collect(Collectors.toList());
    }

    public int acceptJobApplicantRequest(User creator, String applicantUsername, Long postingId) {
        Posting posting = postingRepository.findPostingById(postingId).orElseThrow(PostingDoesNotExistException::new);
        if(!posting.belongsToUser(creator)) {
            throw new UnableToAcceptApplicantException("Forbidden action.");
        }

        if(!isJobAvailable(postingId)) {
            throw new UnableToApplyToJobException("Job is no longer available.");
        }

        User applicant = userService.getUserByUsername(applicantUsername);
        PostingApplication application = postingApplicationRepository.findByPostingIdAndUserId(postingId, applicant.getId()).orElseThrow(
                () -> new UnableToApplyToJobException("Posting application does not exist.")
        );
        application.acceptApplication();

        return 0;
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
}
