package org.woork.backend.posting;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.Valid;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.woork.backend.address.AddressRepository;
import org.woork.backend.exceptions.*;
import org.woork.backend.image.Image;
import org.woork.backend.image.ImageService;
import org.woork.backend.address.Address;
import org.woork.backend.address.AddressService;
import org.woork.backend.posting.requests.PostingLocationRequest;
import org.woork.backend.posting.requests.PostingRequest;
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

    @Autowired
    public PostingService(
            PostingRepository postingRepository,
            AddressService addressService,
            AddressRepository addressRepository,
            ImageService imageService,
            UrlService urlService,
            ValidatorImpl validator,
            PostingApplicationRepository postingApplicationRepository, UserService userService) {
        this.postingRepository = postingRepository;
        this.addressService = addressService;
        this.addressRepository = addressRepository;
        this.imageService = imageService;
        this.urlService = urlService;
        this.validator = validator;
        this.postingApplicationRepository = postingApplicationRepository;
        this.userService = userService;
    }

    private PostingRequest decodeJson(String body) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(body, PostingRequest.class);
        } catch (JsonProcessingException e) {
            log.error(e.getMessage());
            throw new UnableToCreatePostingException();
        }
    }

    public PostingResource createPosting(User author, String body, List<MultipartFile> images) {
        PostingRequest postingRequest = decodeJson(body);
        PostingLocationRequest addressRequest = postingRequest.getAddress();
        validator.validateFields(postingRequest);
        validator.validateFields(addressRequest);

        Address postingLocation = null;

        if(!addressRequest.isCreate()) {
            if(addressRequest.getId() == null)
                throw new UnableToCreatePostingException("Forbidden action.");

            Long locId = addressRequest.getId();

            if(!Objects.equals(author.getAddress().getId(), locId)) {
                Set<Posting> userLocations = postingRepository.findByAuthor_Id(author.getId()).orElse(new HashSet<>());

                if(userLocations.stream().noneMatch(posting -> posting.getAddress().getId().equals(locId))) {
                    throw new UnableToCreatePostingException("Forbidden action. Invalid location id.");
                }
            }

            Address addressObject = addressRepository.findById(locId).orElse(null);
            if(addressObject == null) {
                throw new UnableToCreatePostingException("Forbidden action. Invalid location id.");
            }

            if(addressObject.getLatitude() == null) {
                if(addressRequest.getLatitude() == null && addressRequest.getLongitude() == null) {
                    throw new UnableToCreatePostingException("Latitude and longitude required");
                }
                addressService.storeCoordinates(addressObject, addressRequest.getLatitude().doubleValue(), addressRequest.getLongitude().doubleValue());
            }

            postingLocation = addressObject;
        } else {
            if(addressRequest.getLatitude() == null && addressRequest.getLongitude() == null) {
                throw new UnableToCreatePostingException("Latitude and longitude required.");
            }

            try {
                postingLocation = addressService.createAddress(addressRequest);
            } catch(InvalidLocationException e) {
                throw new UnableToCreatePostingException(e.getMessage());
            }
        }

        Posting posting = new Posting();
        posting.setTitle(postingRequest.getTitle());
        posting.setDescription(postingRequest.getDescription());
        posting.setCategory(postingRequest.getCategory());
        posting.setPrice(postingRequest.getPrice());
        posting.setAddress(postingLocation);
        posting.setAuthor(author);

        Set<Image> imagesObjects = new HashSet<>();
        for(MultipartFile image : images) {
            Image img = imageService.uploadImage(image, "pfp");
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

    public PostingApplication createJobRequest(Long userId, Long postingId) {
        Posting posting = postingRepository.findPostingById(postingId).orElseThrow(PostingDoesNotExistException::new);
        User user = userService.getUser(userId);

        PostingApplication postingApplication = new PostingApplication(
                posting,
                user
        );

        return postingApplicationRepository.save(postingApplication);
    }

    public String applyToJob(User user, Long postingId) {
        if(!isJobAvailable(postingId)) {
            throw new UnableToApplyToJobException("Job is no longer available.");
        }

        PostingApplication application = postingApplicationRepository.findByPostingIdAndUserId(postingId, user.getId()).orElse(null);
        Posting posting = postingRepository.findPostingById(postingId).orElseThrow(PostingDoesNotExistException::new);

        if(application != null) {
            if(application.getStatus().equals(Status.REJECTED.toString())) {
                throw new UnableToApplyToJobException("Job is rejected.");
            }
        }
    }
}
