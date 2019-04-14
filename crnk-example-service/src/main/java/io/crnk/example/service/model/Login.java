package io.crnk.example.service.model;

import io.crnk.core.resource.annotations.JsonApiId;
import io.crnk.core.resource.annotations.JsonApiRelation;
import io.crnk.core.resource.annotations.JsonApiResource;

import java.util.Set;

/**
 * Represents user login information of the user.
 */
@JsonApiResource(type = "login")
public class Login {

    /**
     * Constant &qout;me&qout;
     */
    @JsonApiId
    private String id;

    /**
     * Name of the logged in user.
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

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Set<Secret> getSecrets() {
        return secrets;
    }

    public void setSecrets(Set<Secret> secrets) {
        this.secrets = secrets;
    }

    public Set<Vote> getVotes() {
        return votes;
    }

    public void setVotes(Set<Vote> votes) {
        this.votes = votes;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}
