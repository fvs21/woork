package org.woork.backend.profile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.woork.backend.exceptions.exceptions.UnableToUpdateUserException;
import org.woork.backend.posting.Categories;
import org.woork.backend.profile.requests.EditProfileRequest;
import org.woork.backend.profile.resources.PublicProfileResource;
import org.woork.backend.profile.resources.PublicWorkerProfileResource;
import org.woork.backend.user.User;
import org.woork.backend.user.UserRepository;
import org.woork.backend.user.UserService;
import org.woork.backend.worker.WorkerService;
import org.woork.backend.worker.models.CategoryTag;
import org.woork.backend.worker.models.Worker;
import org.woork.backend.worker.repositories.WorkerRepository;

import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ProfileService {
    private final UserRepository userRepository;
    private final WorkerService workerService;
    private final WorkerRepository workerRepository;
    private final UserService userService;

    @Autowired
    public ProfileService(UserRepository userRepository, WorkerService workerService, WorkerRepository workerRepository, UserService userService) {
        this.userRepository = userRepository;
        this.workerService = workerService;
        this.workerRepository = workerRepository;
        this.userService = userService;
    }

    public PublicProfileResource getProfile(User user) {
        if(user.isWorker()) {
            Worker worker = workerService.getWorker(user);
            return new PublicWorkerProfileResource(worker);
        }

        return new PublicProfileResource(user);
    }

    public PublicProfileResource getProfileByUsername(String username) {
        User user = userService.getUserByUsername(username);
        return getProfile(user);
    }

    public PublicProfileResource updateAbout(User user, EditProfileRequest request) {
        if(!user.isWorker()) {
            user.setAbout(request.getAbout());
            return new PublicProfileResource(userRepository.save(user));
        }

        Set<Categories> categories = request.getCategories();

        if(categories.stream().anyMatch(cat -> !Arrays.stream(Categories.values()).toList().contains(cat))) {
            throw new UnableToUpdateUserException("Invalid category tag");
        }

        Worker worker = workerService.getWorker(user);

        Set<CategoryTag> categoryTags = categories.stream().map(
                cat -> new CategoryTag(cat.toString())
        ).collect(Collectors.toSet());

        worker.setCategories(categoryTags);
        return new PublicWorkerProfileResource(workerRepository.save(worker));
    }
}
