package io.crnk.example.service.basic;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

import io.crnk.core.queryspec.QuerySpec;
import io.crnk.core.repository.ResourceRepositoryBase;
import io.crnk.core.repository.ResourceRepositoryV2;
import io.crnk.core.resource.list.ResourceList;
import org.springframework.stereotype.Component;

/**
 * Showcases a simple in-memory repository.
 */
@Component
public class ScreeningRepository extends ResourceRepositoryBase<Screening, UUID>
		implements ResourceRepositoryV2<Screening, UUID> {

	public Map<UUID, Screening> screenings = new ConcurrentHashMap<>();

	public ScreeningRepository() {
		super(Screening.class);
	}

	@Override
	public ResourceList<Screening> findAll(QuerySpec querySpec) {
		return querySpec.apply(screenings.values());
	}

	@Override
	public <S extends Screening> S save(S entity) {
		screenings.put(entity.getId(), entity);
		return null;
	}

	@Override
	public void delete(UUID id) {
		screenings.remove(id);
	}
}