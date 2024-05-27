package org.woork.backend.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.woork.backend.exceptions.UserDoesNotExistException;
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
    public ResponseEntity<String> handleUserDoesNotExist() {
        return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
    }

    @GetMapping("/verify")
    public User verifyUser(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        return userService.getUserFromToken(token);
    }

    @PutMapping("/gender/update")
    public User updateGender(@RequestHeader(HttpHeaders.AUTHORIZATION) String token, @RequestBody LinkedHashMap<String, String> body) {
        User user = userService.getUserFromToken(token);
        String gender = body.get("gender");
        Gender genderEnum = Gender.valueOf(gender);

        return userService.updateGender(user, genderEnum);
    }

    @PutMapping("/location/update")
    public User updateLocation(@RequestHeader(HttpHeaders.AUTHORIZATION) String token, @RequestBody LocationObject locationObject) {
        User user = userService.getUserFromToken(token);

        return userService.updateLocation(user, locationObject);
    }

    @PutMapping("/pfp/update")
    public ResponseEntity<String> updateProfilePicture(@RequestHeader(HttpHeaders.AUTHORIZATION) String token,
                                                       @RequestParam("image") MultipartFile multipartFile) {
        User user = userService.getUserFromToken(token);

        String uploadImage = userService.uploadProfilePicture(user, multipartFile);
        return new ResponseEntity<>(uploadImage, HttpStatus.OK);
    }
}
