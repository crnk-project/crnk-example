package io.crnk.example.service.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.crnk.core.resource.annotations.JsonApiRelation;
import io.crnk.core.resource.annotations.JsonApiResource;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Transient;
import javax.persistence.Version;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Represents a move.
 */
@JsonApiResource(type = "movie")
@Entity
public class MovieEntity {

    @Id
    private UUID id;

    @JsonProperty
    @NotEmpty
    private String name;

    private int year;

    @OneToMany(mappedBy = "movie")
    private List<RoleEntity> roles = new ArrayList<>();

    /**
     * A link to a non-JPA resource. Served from the other side through the mappedBy-declartion.
     * Must be transient to not get persisted.
     */
    @Transient
    @JsonApiRelation(mappedBy = "movie")
    private List<Vote> votes = new ArrayList<>();

    @Version
    private Integer version;

    public MovieEntity() {
    }

    public List<Vote> getVotes() {
        return votes;
    }

    public void setVotes(List<Vote> votes) {
        this.votes = votes;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public List<RoleEntity> getRoles() {
        return roles;
    }

    public void setRoles(List<RoleEntity> roles) {
        this.roles = roles;
    }

    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }
}
