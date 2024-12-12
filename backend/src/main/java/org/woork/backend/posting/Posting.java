package org.woork.backend.posting;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Digits;
import lombok.Getter;
import lombok.Setter;
import org.woork.backend.image.Image;
import org.woork.backend.address.Address;
import org.woork.backend.postingapplication.PostingApplication;
import org.woork.backend.user.User;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
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

    @Digits(integer = 5, fraction = 2)
    private BigDecimal price;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "address_id", nullable = false)
    private Address address;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "author_id", nullable = false)
    @JsonIgnore
    private User author;

    private String category;

    @OneToMany(cascade = CascadeType.ALL)
    private Set<Image> images;

    @OneToMany(mappedBy = "posting_application")
    Set<PostingApplication> postingApplications;

    public Posting() {
        images = new HashSet<>();
        postingApplications = new HashSet<>();
    }

    public Posting(String title, String description, BigDecimal price, String category, Address address,
                   User author, Set<Image> images) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.author = author;
        this.address = address;
        this.category = category;
        this.images = images;
    }
}
