package io.crnk.example.service.model;

import io.crnk.core.resource.annotations.JsonApiId;
import io.crnk.core.resource.annotations.JsonApiRelation;
import io.crnk.core.resource.annotations.JsonApiResource;
import lombok.Data;

import java.util.Set;

@JsonApiResource(type = "location")
@Data
public class Location {

    @JsonApiId
    private String id;

    @JsonApiRelation(mappedBy = "location")
    private Set<Screening> screenings;

}
