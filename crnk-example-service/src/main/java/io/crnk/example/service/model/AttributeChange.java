package io.crnk.example.service.model;

import io.crnk.core.resource.annotations.JsonApiId;
import io.crnk.core.resource.annotations.JsonApiResource;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Represents the change of an attribute.
 */
@JsonApiResource(type = AttributeChange.RESOURCE_TYPE)
@Data
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

}
