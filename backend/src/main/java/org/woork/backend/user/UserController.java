package org.woork.backend.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.woork.backend.exceptions.UserDoesNotExistException;
import org.woork.backend.exceptions.UserNotVerifiedException;
import org.woork.backend.image.Image;
import org.woork.backend.location.LocationObject;

import java.util.LinkedHashMap;


@RestController
@RequestMapping("api/user")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @ExceptionHandler({UserDoesNotExistException.class})
    public ResponseEntity<String> handleUserDoesNotExist(Exception e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({UserNotVerifiedException.class})
    public ResponseEntity<String> handleUserNotVerified(Exception e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
    }

    //MAPPINGS

    @GetMapping("/verify")
    public User verifyUser(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        return userService.getUserFromAccessToken(token);
    }

    @PutMapping("/gender/update")
    public User updateGender(@RequestHeader(HttpHeaders.AUTHORIZATION) String token, @RequestBody LinkedHashMap<String, String> body) {
        User user = userService.getUserFromAccessToken(token);
        String gender = body.get("gender");
        Gender genderEnum = Gender.valueOf(gender);

        return userService.updateGender(user, genderEnum);
    }

    @PutMapping("/location/update")
    public User updateLocation(@RequestHeader(HttpHeaders.AUTHORIZATION) String token, @RequestBody LocationObject locationObject) {
        User user = userService.getUserFromAccessToken(token);

        return userService.updateLocation(user, locationObject);
    }

    @PutMapping("/pfp/update")
    public ResponseEntity<String> updateProfilePicture(@RequestHeader(HttpHeaders.AUTHORIZATION) String token,
                                                       @RequestParam("image") MultipartFile multipartFile) {
        User user = userService.getUserFromAccessToken(token);

        String uploadImage = userService.uploadProfilePicture(user, multipartFile);
        return new ResponseEntity<>(uploadImage, HttpStatus.OK);
    }
}
