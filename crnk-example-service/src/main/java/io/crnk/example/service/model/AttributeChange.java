package io.crnk.example.service.model;

import io.crnk.core.resource.annotations.JsonApiId;
import io.crnk.core.resource.annotations.JsonApiResource;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Represents the change of an attribute.
 */
@JsonApiResource(type = AttributeChange.RESOURCE_TYPE)
public class AttributeChange {

    public static final String RESOURCE_TYPE = "attributeChange";

    @JsonApiId
    private UUID id;

    /**
     * Name of field undergoing the change.
     */
    private String attribute;

    /**
     * New value after changge.
     */
    private String newValue;

    /**
     * Old value before change.
     */
    private String oldValue;

    /**
     * Time of change.
     */
    private LocalDateTime changeTime;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public LocalDateTime getChangeTime() {
        return changeTime;
    }

    public void setChangeTime(LocalDateTime changeTime) {
        this.changeTime = changeTime;
    }

    public String getAttribute() {
        return attribute;
    }

    public void setAttribute(String attribute) {
        this.attribute = attribute;
    }

    public String getNewValue() {
        return newValue;
    }

    public void setNewValue(String newValue) {
        this.newValue = newValue;
    }

    public String getOldValue() {
        return oldValue;
    }

    public void setOldValue(String oldValue) {
        this.oldValue = oldValue;
    }
}
