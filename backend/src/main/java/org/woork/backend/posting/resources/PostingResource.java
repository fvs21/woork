package org.woork.backend.posting.resources;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.annotation.Resource;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.woork.backend.image.Image;
import org.woork.backend.posting.Categories;
import org.woork.backend.posting.Posting;
import org.woork.backend.posting.requests.PostingLocationRequest;
import org.woork.backend.url.UrlService;
import org.woork.backend.user.User;
import org.woork.backend.utils.PostingUtils;

import java.math.BigDecimal;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@Setter
public class PostingResource {
    private String title;
    private String description;
    private BigDecimal price;
    private Set<String> images_urls;
    private String url;
    private String creator;
    private String creatorUsername;

    @JsonProperty(value = "isUserCreator")
    private boolean isUserCreator;
    private String location_name;
    private Map<String, Double> display_coordinates;
    private String category;

    public PostingResource() {}

    public PostingResource(Posting posting, String url) {
        this.title = posting.getTitle();
        this.description = posting.getDescription();
        this.price = posting.getPrice();

        Set<Image> images = posting.getImages();
        this.images_urls = images.stream().map(
                image -> "http://localhost:8000" + image.getImageUrl()
        ).collect(Collectors.toSet());
        this.url = url;
        this.creator = posting.getAuthor().getFullName()    ;
        this.creatorUsername = posting.getAuthor().getUsername();
        this.isUserCreator = isUsersPosting(posting.getAuthor().getId());
        this.location_name = (!isAuthenticated()) ? posting.getAddress().getAddress_name() : null;
        this.display_coordinates = Map.of(
                "latitude", posting.getAddress().getDisplay_lat(),
                "longitude", posting.getAddress().getDisplay_long()
        );
        this.category = PostingUtils.convertCodeToCategory(
                posting.getCategory()
        );
    }

    private boolean isAuthenticated() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth instanceof AnonymousAuthenticationToken;
    }

    private boolean isUsersPosting(Long creatorId) {
        if(isAuthenticated())
            return false;

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return user.getId().equals(creatorId);
    }
}
