package org.woork.backend.image;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table
public class Image {
    @Id
    @SequenceGenerator(
            name = "image_sequence",
            sequenceName = "image_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "image_sequence"
    )
    @JsonIgnore
    @Column(name = "image_id")
    private Long id;

    @Column(name = "image_name", unique = true, nullable = false)
    @JsonIgnore
    private String imageName;

    @Column(name = "image_type", nullable = false)
    @JsonIgnore
    private String imageType;

    @Column(name = "image_path", nullable = false)
    @JsonIgnore
    private String imagePath;

    @Column(name = "image_url", nullable = false)
    private String imageUrl;

    public Image() {}

    public Image(String imageName, String imageType, String imagePath, String imageUrl) {
        this.imageName = imageName;
        this.imagePath = imagePath;
        this.imageUrl = imageUrl;
        this.imageType = imageType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImageName() {
        return imageName;
    }

    public void setImageName(String imageName) {
        this.imageName = imageName;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getImageType() {
        return imageType;
    }

    public void setImageType(String imageType) {
        this.imageType = imageType;
    }
}
