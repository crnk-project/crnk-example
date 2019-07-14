package io.crnk.example.service.model;

import io.crnk.core.resource.annotations.JsonApiExposed;
import io.crnk.core.resource.annotations.JsonApiId;
import io.crnk.core.resource.annotations.JsonApiRelation;
import io.crnk.core.resource.annotations.JsonApiResource;
import lombok.Data;

/**
 * Login secret for the user. Implemented as nested resource of login.
 */
@JsonApiResource(type = "secret", nested = true)
@JsonApiExposed(false) // do not have endpoint on its own, only nested one
@Data
public class Secret {

    @JsonApiId
    private SecretId id;

    private String name;

    private String value;

    @JsonApiRelation
    private Login login;

}
