package io.crnk.example.service.model;

import io.crnk.core.resource.annotations.JsonApiId;
import io.crnk.core.resource.annotations.JsonApiRelation;
import io.crnk.core.resource.annotations.JsonApiRelationId;
import io.crnk.core.resource.annotations.JsonApiResource;

import java.util.UUID;

/**
 * Status of a screening.
 */
@JsonApiResource(type = "screeningStatus", nested = true)
public class ScreeningStatus {

    /**
     * Both annotations together bind the status to its screening parent.
     * Since we have a one-to-one relationship, both resources have the same identifier.
     * Implemented by the single attribute carrying both the relationship and id annotation.
     */
    @JsonApiId
    @JsonApiRelationId
    private UUID screeningId;

    @JsonApiRelation
    private Screening screening;

    private String description;

    public UUID getScreeningId() {
        return screeningId;
    }

    public void setScreeningId(UUID screeningId) {
        this.screeningId = screeningId;
    }

    public Screening getScreening() {
        return screening;
    }

    public void setScreening(Screening screening) {
        this.screening = screening;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
