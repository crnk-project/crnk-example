package io.crnk.example.service.domain.repository;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import io.crnk.core.queryspec.QuerySpec;
import io.crnk.core.repository.ResourceRepositoryBase;
import io.crnk.core.repository.ResourceRepositoryV2;
import io.crnk.core.resource.list.ResourceList;
import io.crnk.example.service.domain.resource.Vote;


public class VoteRepositoryImpl extends ResourceRepositoryBase<Vote, UUID> implements ResourceRepositoryV2<Vote, UUID> {

	public static Map<UUID, Vote> votes = new HashMap<>();

	public VoteRepositoryImpl() {
		super(Vote.class);
	}

	public static void clear() {
		votes.clear();
	}

	@Override
	public ResourceList<Vote> findAll(QuerySpec querySpec) {
		slowDown();
		return querySpec.apply(votes.values());
	}

	@Override
	public <S extends Vote> S save(S entity) {
		slowDown();
		votes.put(entity.getId(), entity);
		return null;
	}

	@Override
	public void delete(UUID id) {
		slowDown();
		votes.remove(id);
	}

	private void slowDown() {
		// artificially slow it down to simulate loading in frontend
		try {
			Thread.sleep(30);
		}
		catch (InterruptedException e) {
			throw new IllegalStateException(e);
		}
	}
}