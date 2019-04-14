package io.crnk.example.service.model;

import io.crnk.core.resource.annotations.JsonApiId;
import io.crnk.core.resource.annotations.JsonApiRelation;
import io.crnk.core.resource.annotations.JsonApiResource;

import java.util.UUID;

/**
 * Vote from a user for a movie.
 */
@JsonApiResource(type = "vote")
public class Vote {

    @JsonApiId
    private UUID id;

    /**
     * Voted movie.
     */
    @JsonApiRelation
    private MovieEntity movie;

    /**
     * User that published the vote. TODO create seperate "user" and "login"
     */
    @JsonApiRelation
    private Login user;

    private int starts;

    public Login getUser() {
        return user;
    }

    public void setUser(Login user) {
        this.user = user;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public MovieEntity getMovie() {
        return movie;
    }

    public void setMovie(MovieEntity movie) {
        this.movie = movie;
    }

    public int getStarts() {
        return starts;
    }

    public void setStarts(int starts) {
        this.starts = starts;
    }
}
