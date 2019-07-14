package io.crnk.example.service.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.crnk.core.resource.annotations.JsonApiResource;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Size;


/**
 * Role within a movie.
 */
@JsonApiResource(type = "role")
@Entity
@Data
public class RoleEntity {

    /**
     * Unique identifier of the role
     */
    @Id
    private Long id;

    /**
     * Name of the role.
     */
    @JsonProperty("role")
    private String name;

    /**
     * Description of role.
     */
    @Size(max = 20, message = "Description may not exceed {max} characters.")
    private String description;

    @JsonIgnore
    private Long someId;

    /**
     * Move this role is associated to.
     */
    @ManyToOne
    private MovieEntity movie;

    /**
     * Person this role is associated to.
     */
    @ManyToOne
    private PersonEntity person;

}
