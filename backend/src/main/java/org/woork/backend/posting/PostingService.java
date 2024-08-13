package org.woork.backend.posting;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.woork.backend.exceptions.InvalidLocationException;
import org.woork.backend.exceptions.PostingDoesNotExistException;
import org.woork.backend.exceptions.UnableToCreatePostingException;
import org.woork.backend.image.Image;
import org.woork.backend.image.ImageService;
import org.woork.backend.location.Location;
import org.woork.backend.location.LocationService;
import org.woork.backend.user.User;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class PostingService {
    private final PostingRepository postingRepository;
    private final LocationService locationService;
    private final ImageService imageService;

    @Autowired
    public PostingService(PostingRepository postingRepository, LocationService locationService,
                          ImageService imageService) {
        this.postingRepository = postingRepository;
        this.locationService = locationService;
        this.imageService = imageService;
    }

    public PostingDTO toDTO(Posting posting) {
        PostingDTO postingDTO = new PostingDTO();
        postingDTO.setImages(posting.getImages());
        postingDTO.setAuthor(posting.getAuthor().getFirst_name() + " " + posting.getAuthor().getLast_name());
        postingDTO.setTitle(posting.getTitle());
        postingDTO.setDescription(posting.getDescription());
        postingDTO.setLocation(locationService.toDTO(posting.getLocation()));
        postingDTO.setPrice(posting.getPrice());
        return postingDTO;
    }

    private PostingDTO mapStringToDTO(String body) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(body, PostingDTO.class);
        } catch (JsonProcessingException e) {
            throw new UnableToCreatePostingException();
        }
    }

    public PostingDTO createPosting(User author, String body, List<MultipartFile> images) {
        Posting posting = new Posting();
        PostingDTO postingDTO = mapStringToDTO(body);

        Location location = locationService.createLocation(postingDTO.getLocation());
        posting.setTitle(postingDTO.getTitle());
        posting.setDescription(postingDTO.getDescription());
        posting.setPrice(postingDTO.getPrice());
        posting.setCategory(postingDTO.getCategory());
        posting.setLocation(location);
        posting.setAuthor(author);

        Set<Image> imageSet = new HashSet<>();

        for (MultipartFile file : images) {
            Image image = imageService.uploadImage(file, "posting");
            imageSet.add(image);
        }
        posting.setImages(imageSet);
        postingRepository.save(posting);
        //userService.addPosting(author, posting);

        postingDTO.setAuthor(author.getFirst_name() + " " + author.getLast_name());
        postingDTO.setImages(imageSet);
        return postingDTO;
    }

    public PostingDTO getPosting(Long id) {
        Posting posting = postingRepository.findPostingById(id).orElseThrow(PostingDoesNotExistException::new);

        return toDTO(posting);
    }

    public Set<PostingDTO> getPostingByLocation(Location location) {
        Set<Posting> postings = postingRepository.findAllByLocation(location).orElse(new HashSet<>());

        return postings
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toSet());
    }

    public Set<PostingDTO> getPostingByLocationAndCategory(Location  location, Category category) {
        Set<Posting> postings = postingRepository.findAllByLocationAndCategory(location, category)
                .orElseThrow(PostingDoesNotExistException::new);

        return postings
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toSet());
    }

    public List<PostingDTO> getPostingsByState(String country, String state) {
        List<Location> locations = locationService.getLocationsByState(country, state);
        List<PostingDTO> postings = new ArrayList<>();
        for (Location location : locations) {
            postings.addAll(getPostingByLocation(location));
        }
        return postings;
    }

    //filter by category, country and state
    public List<PostingDTO> getPostingsByCategoryAndState(String category, String country, String state) {
        List<Location> locations = locationService.getLocationsByState(country, state);
        List<PostingDTO> postings = new ArrayList<>();
        for(Location location : locations) {
                postings.addAll(
                        getPostingByLocationAndCategory(location, Category.valueOf(category))
                );
        }
        return postings;
    }

    //filter by category, country, state and city
    public List<PostingDTO> getPostingsByCategoryAndCity(String category, String country, String state, String city) {
        List<Location> locations = locationService.getLocationsByCity(country, state, city);
        List<PostingDTO> postings = new ArrayList<>();
        for(Location location : locations) {
            try {
                postings.addAll(
                        getPostingByLocationAndCategory(location, Category.valueOf(category))
                );
            } catch (PostingDoesNotExistException ignored) {}
        }
        return postings;
    }

    public Set<PostingDTO> getPostingsByUser(User user) {
        Set<Posting> postings = postingRepository.findByAuthor(user).orElse(new HashSet<>());

        Set<PostingDTO> postingDTOs = new HashSet<>();
        for(Posting posting : postings) {
            postingDTOs.add(toDTO(posting));
        }

        return postingDTOs;
    }
}
