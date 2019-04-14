package io.crnk.example.service.model;

import io.crnk.core.resource.annotations.JsonApiId;
import io.crnk.core.resource.annotations.JsonApiRelation;
import io.crnk.core.resource.annotations.JsonApiResource;

import java.util.Set;

/**
 * Represent a location.
 */
@JsonApiResource(type = "location")
public class Location {

    /**
     * Name of the location.
     */
    @JsonApiId
    private String id;

    /**
     * Screenings at the particular location. Served from the other side.
     */
    @JsonApiRelation(mappedBy = "location")
    private Set<Screening> screenings;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Set<Screening> getScreenings() {
        return screenings;
    }

    public void setScreenings(Set<Screening> screenings) {
        this.screenings = screenings;
    }
}
