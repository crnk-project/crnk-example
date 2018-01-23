package io.crnk.example.service.domain.repository;

import java.util.UUID;

import io.crnk.core.exception.ForbiddenException;
import io.crnk.core.queryspec.QuerySpec;
import io.crnk.core.repository.ResourceRepositoryBase;
import io.crnk.core.repository.ResourceRepositoryV2;
import io.crnk.core.resource.list.ResourceList;
import io.crnk.example.service.domain.resource.Secret;


public class SecretRepositoryImpl extends ResourceRepositoryBase<Secret, UUID> implements ResourceRepositoryV2<Secret, UUID> {

	public SecretRepositoryImpl() {
		super(Secret.class);
	}

	@Override
	public ResourceList<Secret> findAll(QuerySpec querySpec) {
		throw new ForbiddenException("not allowed to see this...");
	}
}