package io.crnk.example.service.model;

import io.crnk.core.resource.annotations.JsonApiId;
import io.crnk.core.resource.annotations.JsonApiRelation;
import io.crnk.core.resource.annotations.JsonApiResource;
import lombok.Data;

import java.util.Set;

/**
 * Represents user login information of the user.
 */
@JsonApiResource(type = "login")
@Data
public class Login {

    /**
     * Constant &qout;me&qout;
     */
    @JsonApiId
    private String id;

    /**
     * Name of the logged in user
     */
    private String userName;

    /**
     * Votes of the logged in user.
     */
    @JsonApiRelation(mappedBy = "user")
    private Set<Vote> votes;

    /**
     * Login secrets of this user.
     */
    @JsonApiRelation(mappedBy = "login")
    private Set<Secret> secrets;

}
