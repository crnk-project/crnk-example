package io.crnk.example.service.model;

import io.crnk.core.resource.annotations.JsonApiId;
import io.crnk.core.resource.annotations.JsonApiRelation;
import io.crnk.core.resource.annotations.JsonApiRelationId;
import io.crnk.core.resource.annotations.JsonApiResource;
import io.crnk.core.resource.annotations.SerializeType;

import java.time.OffsetDateTime;
import java.util.UUID;

/**
 * Screening of a movie at a particular location.
 */
@JsonApiResource(type = "screening")
public class Screening {

    @JsonApiId
    private UUID id;

    @JsonApiRelationId
    private UUID movieId;

    /**
     * relationship that is backed by a simple movieId attribute carrying the @JsonApiRelationId annotation.
     */
    @JsonApiRelation
    private MovieEntity movie;

    /**
     * relationship that is backed by the ScreeningLocationRepository. ID of location always
     * included response.
     */
    @JsonApiRelation(serialize = SerializeType.ONLY_ID)
    private Location location;

    /**
     * Current status of a screening implemented as nested resource.
     */
    @JsonApiRelation(serialize = SerializeType.EAGER, mappedBy = "screening")
    private ScreeningStatus status;

    /**
     * Time of screening.
     */
    private OffsetDateTime time;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public ScreeningStatus getStatus() {
        return status;
    }

    public void setStatus(ScreeningStatus status) {
        this.status = status;
    }

    public OffsetDateTime getTime() {
        return time;
    }

    public void setTime(OffsetDateTime time) {
        this.time = time;
    }

    public UUID getMovieId() {
        return movieId;
    }

    public void setMovieId(UUID movieId) {
        this.movieId = movieId;

        // movie reference becomes invalid
        this.movie = null;
    }

    public MovieEntity getMovie() {
        return movie;
    }

    public void setMovie(MovieEntity movie) {
        this.movie = movie;
        this.movieId = movie != null ? movie.getId() : null;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }
}
