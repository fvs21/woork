package org.woork.backend.image;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
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
    @Column(name = "image_id")
    @JsonIgnore
    private Long id;

    @Column(name = "image_name", unique = true, nullable = false)
    @JsonIgnore
    private String imageName;

    @Column(name = "image_type", nullable = false)
    @JsonIgnore
    private String imageType;

    @Column(name = "image_path", unique = true, nullable = false)
    @JsonIgnore
    private String imagePath;

    @Column(name = "image_url", unique = true, nullable = false)
    private String imageUrl;

    private String container;

    public Image() {}

    public Image(String imageName, String imageType, String imagePath, String imageUrl, String container) {
        this.imageName = imageName;
        this.imagePath = imagePath;
        this.imageUrl = imageUrl;
        this.imageType = imageType;
        this.container = container;
    }

}
