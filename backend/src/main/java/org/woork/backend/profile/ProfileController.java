package org.woork.backend.profile;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.woork.backend.authentication.AuthenticationService;
import org.woork.backend.profile.requests.EditProfileRequest;
import org.woork.backend.profile.resources.PublicProfileResource;
import org.woork.backend.user.User;
import org.woork.backend.user.UserService;
import org.woork.backend.validators.ValidatorImpl;

import java.util.Map;

@RestController
@RequestMapping(name = "api/profile")
public class ProfileController {
    private final AuthenticationService authenticationService;
    private final UserService userService;
    private final ProfileService profileService;
    private final ValidatorImpl validatorImpl;

    @Autowired
    public ProfileController(AuthenticationService authenticationService, UserService userService, ProfileService profileService, ValidatorImpl validatorImpl) {
        this.authenticationService = authenticationService;
        this.userService = userService;
        this.profileService = profileService;
        this.validatorImpl = validatorImpl;
    }

    @GetMapping("/")
    public Map<String, Object> usersProfile() {
        User user = authenticationService.getCurrentUser();
        return Map.of(
                "publicProfile", new PublicProfileResource(user),
                "isUsersAccount", true
        );
    }

    @GetMapping("/show/{username}")
    public Map<String, Object> showProfile(@PathVariable String username) {
        User user = userService.getUserByUsername(username);
        User authenticatedUser = authenticationService.getCurrentUser();
        return Map.of(
                "publicProfile", new PublicProfileResource(user),
                "isUsersAccount", authenticatedUser.getId().equals(user.getId())
        );
    }

    @PutMapping("/edit")
    public PublicProfileResource editProfile(@Valid @RequestBody EditProfileRequest editProfileRequest) {
        validatorImpl.validateFields(editProfileRequest);

        User user = authenticationService.getCurrentUser();
        profileService.updateAbout(user, editProfileRequest.getAbout());
        return new PublicProfileResource(user);
    }
}
