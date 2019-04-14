package io.crnk.example.service.repository;

import io.crnk.core.queryspec.QuerySpec;
import io.crnk.core.repository.InMemoryResourceRepository;
import io.crnk.core.repository.ResourceRepositoryBase;
import io.crnk.core.resource.list.ResourceList;
import io.crnk.example.service.model.Vote;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Showcases a simple in-memory repository with some artificial slow
 * down to simulate expensive requests and show loading indicators
 * in the frontend.
 * <p>
 * Real-world application may rather make use of the existing {@link InMemoryResourceRepository}.
 */
@Component
public class VoteRepository extends ResourceRepositoryBase<Vote, UUID> {

    public static Map<UUID, Vote> votes = new ConcurrentHashMap<>();

    public VoteRepository() {
        super(Vote.class);
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
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            throw new IllegalStateException(e);
        }
    }
}