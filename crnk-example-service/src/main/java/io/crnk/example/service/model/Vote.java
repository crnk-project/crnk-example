package io.crnk.example.service.model;

import io.crnk.core.resource.annotations.JsonApiId;
import io.crnk.core.resource.annotations.JsonApiRelation;
import io.crnk.core.resource.annotations.JsonApiResource;
import lombok.Data;

import java.util.UUID;

/**
 * Vote from a user for a movie.
 */
@JsonApiResource(type = "vote")
@Data
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

}
