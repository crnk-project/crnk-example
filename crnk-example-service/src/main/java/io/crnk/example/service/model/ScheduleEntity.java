package io.crnk.example.service.model;

import io.crnk.core.resource.annotations.JsonApiResource;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;


/**
 * Release schedule of a movie.
 */
@JsonApiResource(type = "schedule")
@Entity
@Data
public class ScheduleEntity {

    @Id
    private Long id;

    private String description;

    @ManyToOne
    private MovieEntity movie;

}
