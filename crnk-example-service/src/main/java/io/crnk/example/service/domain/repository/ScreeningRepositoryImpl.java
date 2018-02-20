package io.crnk.example.service.domain.repository;

import io.crnk.core.queryspec.QuerySpec;
import io.crnk.core.repository.ResourceRepositoryBase;
import io.crnk.core.repository.ResourceRepositoryV2;
import io.crnk.core.resource.list.ResourceList;
import io.crnk.example.service.domain.resource.Screening;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;


public class ScreeningRepositoryImpl extends ResourceRepositoryBase<Screening, UUID>
		implements ResourceRepositoryV2<Screening, UUID> {

	public static Map<UUID, Screening> screenings = new HashMap<>();

	public ScreeningRepositoryImpl() {
		super(Screening.class);
	}

	public static void clear() {
		screenings.clear();
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