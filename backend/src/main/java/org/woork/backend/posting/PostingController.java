package org.woork.backend.posting;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.woork.backend.address.AddressResource;
import org.woork.backend.address.AddressService;
import org.woork.backend.authentication.AuthenticationService;
import org.woork.backend.posting.records.AcceptJobApplicationResponse;
import org.woork.backend.posting.records.PostingResponse;
import org.woork.backend.posting.requests.AcceptJobApplicationRequest;
import org.woork.backend.posting.resources.PostingResource;
import org.woork.backend.postingapplication.resources.ApplicantResource;
import org.woork.backend.user.User;
import org.woork.backend.user.UserService;
import org.woork.backend.user.resources.UserResource;

import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("api/posting")
public class PostingController {
    private static final Log log = LogFactory.getLog(PostingController.class);
    private final PostingService postingService;
    private final UserService userService;
    private final AuthenticationService authenticationService;
    private final AddressService addressService;

    @Autowired
    public PostingController(PostingService postingService, UserService userService, AuthenticationService authenticationService, AddressService addressService) {
        this.postingService = postingService;
        this.userService = userService;
        this.authenticationService = authenticationService;
        this.addressService = addressService;
    }


    @PostMapping(value = "/create", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public PostingResource createPosting(
            @RequestPart String posting,
            @RequestPart List<MultipartFile> images
    ) {
        User author = authenticationService.getCurrentUser();

        return postingService.createPosting(author, posting, images);
    }

    @GetMapping("/{id}")
    public PostingResponse getPosting(@PathVariable("id") String id) {
        return postingService.getPostingByHashId(id);
    }

    @GetMapping("/addresses")
    public Set<AddressResource> getAddresses() {
        User user = authenticationService.getCurrentUser();
        return postingService.getUserCreatedAddresses(user);
    }

    @DeleteMapping("/address/{id}")
    public String deletePosting(@PathVariable Long id) {
        User user = authenticationService.getCurrentUser();

        addressService.deleteAddedAddress(id, user);
        return "Dirección eliminada.";
    }

    @PostMapping("/apply")
    public String applyToJob(@RequestBody Map<String, String> body) {
        User user = authenticationService.getCurrentUser();

        return postingService.applyToJob(user, body.get("id"));
    }

    @GetMapping("/{id}/applicants")
    public List<ApplicantResource> getApplicants(@PathVariable("id") String id) {
        User user = authenticationService.getCurrentUser();

        return postingService.getJobPostingApplicants(user, id);
    }

    @GetMapping("/created")
    public Set<PostingResource> getCreatedPostings() {
        User user = authenticationService.getCurrentUser();

        return postingService.getUserCreatedPostings(user);
    }

    @DeleteMapping("/{id}")
    public String deletePosting(@PathVariable("id") String id) {
        User user = authenticationService.getCurrentUser();

        return postingService.deletePosting(id, user);
    }

    @PostMapping("/application/accept")
    public AcceptJobApplicationResponse acceptApplication(@RequestBody AcceptJobApplicationRequest request) {
        User user = authenticationService.getCurrentUser();

        return postingService.acceptJobApplicantRequest(user, request.applicantId(), request.postingId());
    }
}
