package org.woork.backend.posting;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.woork.backend.annotations.Verified;
import org.woork.backend.exceptions.InvalidLocationException;
import org.woork.backend.exceptions.PostingDoesNotExistException;
import org.woork.backend.exceptions.UnableToCreatePostingException;
import org.woork.backend.exceptions.UserNotVerifiedException;
import org.woork.backend.user.User;
import org.woork.backend.user.UserService;

import java.util.List;

@RestController
@RequestMapping("api/posting")
public class PostingController {
    private final PostingService postingService;
    private final UserService userService;

    @Autowired
    public PostingController(PostingService postingService, UserService userService) {
        this.postingService = postingService;
        this.userService = userService;
    }

    @ExceptionHandler({UserNotVerifiedException.class})
    public ResponseEntity<String> handleForbiddenRequest(Exception e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler({PostingDoesNotExistException.class})
    public ResponseEntity<String> handleNotFoundRequest(Exception e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({InvalidLocationException.class})
    public ResponseEntity<String> handleBadRequest(Exception e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({UnableToCreatePostingException.class})
    public ResponseEntity<String> handleInternalServerError(Exception e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Verified
    @PostMapping(value = "/create", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public PostingDTO createPosting(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String token,
            @RequestPart String posting,
            @RequestPart List<MultipartFile> images) {
        User author = userService.getUserFromAccessToken(token);
        return postingService.createPosting(author, posting, images);
    }

    @GetMapping("/{id}")
    public PostingDTO getPosting(@PathVariable("id") Long id) {
        return postingService.getPosting(id);
    }

    @GetMapping("/state")
    public List<PostingDTO> getPostingsByCategoryAndState(
            @RequestParam("category") String category,
            @RequestParam("country") String country,
            @RequestParam("state") String state) {
        return postingService.getPostingsByCategoryAndState(category.toUpperCase(), country, state);
    }

    @GetMapping("/city")
    public List<PostingDTO> getPostingsByCategoryStateAndCity(
            @RequestParam("category") String category,
            @RequestParam("country") String country,
            @RequestParam("state") String state,
            @RequestParam("city") String city
    ) {
        return postingService.getPostingsByCategoryAndCity(category.toUpperCase(), country, state, city);
    }
}
