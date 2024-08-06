package org.woork.backend.posting;

import jakarta.validation.constraints.NotBlank;
import org.woork.backend.image.Image;
import org.woork.backend.location.LocationDTO;

import java.util.Set;

public class PostingDTO {
    @NotBlank(message = "Title cannot be null")
    private String title;

    @NotBlank(message = "Description cannot be null")
    private String description;

    @NotBlank(message = "Price cannot be null")
    private Double price;

    @NotBlank(message = "Location cannot be null")
    private LocationDTO location;

    @NotBlank(message = "Category cannot be null")
    private Category category;

    private String author;

    private Set<Image> images;

    public PostingDTO(String title, String description, Double price, LocationDTO locationDTO, Category category) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.location = locationDTO;
        this.category = category;
    }

    public PostingDTO() {

    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public LocationDTO getLocation() {
        return location;
    }

    public void setLocation(LocationDTO locationDTO) {
        this.location = locationDTO;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public Set<Image> getImages() {
        return images;
    }

    public void setImages(Set<Image> images) {
        this.images = images;
    }
}
