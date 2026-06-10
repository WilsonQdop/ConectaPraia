package br.com.uninassau.LEI.ConectaPraia.domain;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "registrados")
public class Registered {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "turista_id")
    private Tourist tourist;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private PostsService postsService;

    private LocalDateTime registeredAt;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Tourist getTourist() {
        return tourist;
    }

    public void setTourist(Tourist tourist) {
        this.tourist = tourist;
    }

    public PostsService getPost() {
        return postsService;
    }

    public void setPost(PostsService postsService) {
        this.postsService = postsService;
    }

    public LocalDateTime getRegisteredAt() {
        return registeredAt;
    }

    public void setRegisteredAt(LocalDateTime registeredAt) {
        this.registeredAt = registeredAt;
    }
}
