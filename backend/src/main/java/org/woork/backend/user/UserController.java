package org.woork.backend.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.woork.backend.address.requests.UpdateAddressRequest;
import org.woork.backend.authentication.AuthenticationService;
import org.woork.backend.user.resources.UserResource;

import java.util.LinkedHashMap;


@RestController
@RequestMapping("api/user")
public class UserController {
    private final UserService userService;
    private final AuthenticationService authenticationService;

    @Autowired
    public UserController(UserService userService, AuthenticationService authenticationService) {
        this.userService = userService;
        this.authenticationService = authenticationService;
    }

    //MAPPINGS
    @GetMapping("/verify")
    public UserResource verifyUser() {
        return new UserResource(
                authenticationService.getCurrentUser()
        );
    }

    @PutMapping("/gender/update")
    public UserResource updateGender(@RequestBody LinkedHashMap<String, String> body) {
        User user = authenticationService.getCurrentUser();
        String gender = body.get("gender");

        return userService.updateGender(user, gender);
    }

    @PutMapping("/location/update")
    public UserResource updateLocation(@RequestBody UpdateAddressRequest updateAddressRequest) {
        User user = authenticationService.getCurrentUser();

        return userService.updateLocation(user, updateAddressRequest);
    }

    @PutMapping("/pfp/update")
    public UserResource updateProfilePicture(@RequestParam("image") MultipartFile multipartFile) {
        User user = authenticationService.getCurrentUser();

        return userService.uploadProfilePicture(user, multipartFile);
    }
}
