package org.woork.backend.profile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.woork.backend.profile.resources.PublicProfileResource;
import org.woork.backend.user.User;
import org.woork.backend.user.UserRepository;

@Service
public class ProfileService {
    private final UserRepository userRepository;

    @Autowired
    public ProfileService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public PublicProfileResource updateAbout(User user, String about) {
        user.setAbout(about);
        return new PublicProfileResource(userRepository.save(user));
    }
}
