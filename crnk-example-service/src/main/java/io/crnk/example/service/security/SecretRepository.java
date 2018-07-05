package io.crnk.example.service.security;

import java.util.UUID;

import io.crnk.core.exception.ForbiddenException;
import io.crnk.core.queryspec.QuerySpec;
import io.crnk.core.repository.ResourceRepositoryBase;
import io.crnk.core.repository.ResourceRepositoryV2;
import io.crnk.core.resource.list.ResourceList;
import org.springframework.stereotype.Component;

/**
 * Showcases throwing a forbidden exception to demonstrate error handling on the
 * frontend side.
 */
@Component
public class SecretRepository extends ResourceRepositoryBase<Secret, UUID> implements ResourceRepositoryV2<Secret, UUID> {

	public SecretRepository() {
		super(Secret.class);
	}

	@Override
	public ResourceList<Secret> findAll(QuerySpec querySpec) {
		throw new ForbiddenException("not allowed to see this...");
	}
}