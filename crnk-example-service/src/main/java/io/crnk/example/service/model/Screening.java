package io.crnk.example.service.model;

import io.crnk.core.resource.annotations.JsonApiId;
import io.crnk.core.resource.annotations.JsonApiRelation;
import io.crnk.core.resource.annotations.JsonApiRelationId;
import io.crnk.core.resource.annotations.JsonApiResource;
import io.crnk.core.resource.annotations.SerializeType;
import lombok.Data;

import java.time.OffsetDateTime;
import java.util.UUID;

/**
 * Screening of a movie at a particular location.
 */
@JsonApiResource(type = "screening")
@Data
public class Screening {

    @JsonApiId
    private UUID id;

    @JsonApiRelationId
    private UUID movieId;

    /**
     * relationship that is backed by a simple movieId attribute carrying the @JsonApiRelationId annotation.
     */
    @JsonApiRelation
    private MovieEntity movie;

    /**
     * relationship that is backed by the ScreeningLocationRepository. ID of location always
     * included response.
     */
    @JsonApiRelation(serialize = SerializeType.ONLY_ID)
    private Location location;

    /**
     * Current status of a screening implemented as nested resource.
     */
    @JsonApiRelation(serialize = SerializeType.EAGER, mappedBy = "screening")
    private ScreeningStatus status;

    /**
     * Time of screening.
     */
    private OffsetDateTime time;

}
