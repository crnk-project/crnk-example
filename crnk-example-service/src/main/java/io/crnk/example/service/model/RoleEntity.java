package io.crnk.example.service.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.crnk.core.resource.annotations.JsonApiResource;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Size;


/**
 * Role within a movie.
 */
@JsonApiResource(type = "role")
@Entity
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

    public RoleEntity() {
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public Long getSomeId() {
        return someId;
    }

    public void setSomeId(Long someId) {
        this.someId = someId;
    }

    public PersonEntity getPerson() {
        return person;
    }

    public void setPerson(PersonEntity person) {
        this.person = person;
    }
}
