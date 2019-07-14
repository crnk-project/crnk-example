package io.crnk.example.service.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.crnk.core.resource.annotations.JsonApiResource;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Version;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Represents a person involed with a movie through roles.
 */
@JsonApiResource(type = "person")
@Entity
@Data
public class PersonEntity {

    @Id
    private UUID id;

    @JsonProperty
    private String name;

    private int year;

    @OneToMany(mappedBy = "movie")
    private List<RoleEntity> roles = new ArrayList<>();

    @Version
    private Integer version;
}
