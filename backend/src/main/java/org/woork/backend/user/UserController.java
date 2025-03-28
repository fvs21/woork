package org.woork.backend.user;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.woork.backend.address.requests.UpdateAddressRequest;
import org.woork.backend.authentication.AuthenticationService;
import org.woork.backend.user.requests.UpdateGenderRequest;
import org.woork.backend.user.resources.UserResource;
import org.woork.backend.validators.ValidatorImpl;

import java.util.Map;


@RestController
@RequestMapping("api/user")
public class UserController {
    private final UserService userService;
    private final AuthenticationService authenticationService;
    private final ValidatorImpl validatorImpl;

    @Autowired
    public UserController(UserService userService, AuthenticationService authenticationService, ValidatorImpl validatorImpl) {
        this.userService = userService;
        this.authenticationService = authenticationService;
        this.validatorImpl = validatorImpl;
    }

    //MAPPINGS
    @GetMapping("/verify")
    public UserResource verifyUser() {
        return new UserResource(
                authenticationService.getCurrentUser()
        );
    }

    @PatchMapping("/gender/update")
    public UserResource updateGender(@RequestBody UpdateGenderRequest request) {
        User user = authenticationService.getCurrentUser();

        return userService.updateGender(user, request);
    }

    @PatchMapping("/address/update")
    public UserResource updateLocation(@Valid @RequestBody UpdateAddressRequest updateAddressRequest) {
        User user = authenticationService.getCurrentUser();

        return userService.updateAddress(user, updateAddressRequest);
    }

    @PatchMapping("/pfp/update")
    public UserResource updateProfilePicture(
            @RequestParam("image")
            @NotNull(message = "Foto de perfil faltante")
            MultipartFile multipartFile
    ) {
        User user = authenticationService.getCurrentUser();

        return userService.updateProfilePicture(user, multipartFile);
    }

    @PatchMapping("/dob/update")
    public UserResource updateDateOfBirth(@RequestBody Map<String, String> map) {
        User user = authenticationService.getCurrentUser();
        return userService.updateDateOfBirth(user, map.get("dateOfBirth"));
    }
}
