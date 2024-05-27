package org.woork.backend.posting;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.woork.backend.user.User;

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
    private Double offer;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "author_id", nullable = false)
    private User author;

    public Posting() {}

    public Posting(String title, String description, Double offer, User author) {
        this.title = title;
        this.description = description;
        this.offer = offer;
        this.author = author;
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

    public Double getOffer() {
        return offer;
    }

    public void setOffer(Double offer) {
        this.offer = offer;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }
}
