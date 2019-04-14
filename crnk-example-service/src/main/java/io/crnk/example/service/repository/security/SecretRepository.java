package io.crnk.example.service.repository.security;

import io.crnk.core.exception.ForbiddenException;
import io.crnk.core.queryspec.QuerySpec;
import io.crnk.core.repository.ResourceRepositoryBase;
import io.crnk.core.resource.list.ResourceList;
import io.crnk.example.service.model.Secret;
import org.springframework.stereotype.Component;

import java.util.UUID;

/**
 * Showcases throwing a forbidden exception.
 */
@Component
public class SecretRepository extends ResourceRepositoryBase<Secret, UUID> {

    public SecretRepository() {
        super(Secret.class);
    }

    @Override
    public ResourceList<Secret> findAll(QuerySpec querySpec) {
        throw new ForbiddenException("not allowed to see this...");
    }
}