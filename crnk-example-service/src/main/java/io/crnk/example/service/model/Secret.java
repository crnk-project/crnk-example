package io.crnk.example.service.model;

import io.crnk.core.resource.annotations.JsonApiExposed;
import io.crnk.core.resource.annotations.JsonApiId;
import io.crnk.core.resource.annotations.JsonApiRelation;
import io.crnk.core.resource.annotations.JsonApiResource;

/**
 * Login secret for the user. Implemented as nested resource of login.
 */
@JsonApiResource(type = "secret", nested = true)
@JsonApiExposed(false) // do not have endpoint on its own, only nested one
public class Secret {

    @JsonApiId
    private SecretId id;

    private String name;

    private String value;

    @JsonApiRelation
    private Login login;

    public SecretId getId() {
        return id;
    }

    public void setId(SecretId id) {
        this.id = id;
    }

    public Login getLogin() {
        return login;
    }

    public void setLogin(Login login) {
        this.login = login;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
