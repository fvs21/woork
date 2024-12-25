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
import org.woork.backend.worker.Worker;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
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

    @Column(length = 450)
    private String description;

    @Digits(integer = 5, fraction = 2)
    private BigDecimal price;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "posting_address_id", referencedColumnName = "address_id", nullable = false)
    private Address address;

    @ManyToOne
    @JoinColumn(name = "author_id", nullable = false)
    private User author;

    private String category;

    @OneToMany(cascade = CascadeType.ALL)
    private Set<Image> images;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "posting")
    private List<PostingApplication> postingApplications;

    @OneToOne
    @JoinColumn(name = "completed_by")
    private Worker completedBy;

    public Posting() {
        images = new HashSet<>();
        postingApplications = new ArrayList<>();
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

    public boolean belongsToUser(User user) {
        return author.getId().equals(user.getId());
    }
}
