package org.woork.backend.posting;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.woork.backend.image.Image;
import org.woork.backend.location.Location;
import org.woork.backend.user.User;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "postings")
public class Posting {
    @Id
    @SequenceGenerator(
            name = "posting_sequence",
            sequenceName = "posting_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "posting_sequence"
    )
    @JsonIgnore
    @Column(name = "posting_id")
    private Long id;

    private String title;
    private String description;
    private Double price;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "location_id", referencedColumnName = "location_id", nullable = false)
    private Location location;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "author_id", nullable = false)
    @JsonIgnore
    private User author;

    @Enumerated(EnumType.STRING)
    private Category category;

    @OneToMany(cascade = CascadeType.ALL)
    private Set<Image> images;

    public Posting() {
        images = new HashSet<>();
    }

    public Posting(String title, String description, Double price, Category category, Location location,
                   User author, Set<Image> images) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.author = author;
        this.location = location;
        this.category = category;
        this.images = images;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Set<Image> getImages() {
        return images;
    }
    public void setImages(Set<Image> images) {
        this.images = images;
    }
}
