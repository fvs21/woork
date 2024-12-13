package org.woork.backend.posting;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.woork.backend.authentication.AuthenticationService;
import org.woork.backend.exceptions.InvalidLocationException;
import org.woork.backend.exceptions.PostingDoesNotExistException;
import org.woork.backend.exceptions.UnableToCreatePostingException;
import org.woork.backend.exceptions.UserPhoneNotVerifiedException;
import org.woork.backend.posting.requests.PostingRequest;
import org.woork.backend.posting.resources.PostingResource;
import org.woork.backend.user.User;
import org.woork.backend.user.UserService;

import java.util.List;

@RestController
@RequestMapping("api/posting")
public class PostingController {
    private final PostingService postingService;
    private final UserService userService;
    private final AuthenticationService authenticationService;

    @Autowired
    public PostingController(PostingService postingService, UserService userService, AuthenticationService authenticationService) {
        this.postingService = postingService;
        this.userService = userService;
        this.authenticationService = authenticationService;
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
    public PostingResource getPosting(@PathVariable("id") Long id) {
        return postingService.getPosting(id);
    }
}
