package io.crnk.example.service.model;

import io.crnk.core.resource.annotations.JsonApiResource;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;


/**
 * Release schedule of a movie.
 */
@JsonApiResource(type = "schedule")
@Entity
public class ScheduleEntity {

    @Id
    private Long id;

    private String description;

    @ManyToOne
    private MovieEntity movie;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public MovieEntity getMovie() {
        return movie;
    }

    public void setMovie(MovieEntity movie) {
        this.movie = movie;
    }
}
