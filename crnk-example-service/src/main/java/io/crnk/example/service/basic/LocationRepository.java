package io.crnk.example.service.basic;

import java.util.Map;
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
public class LocationRepository extends ResourceRepositoryBase<Location, String>
		implements ResourceRepositoryV2<Location, String> {

	public Map<String, Location> locations = new ConcurrentHashMap<>();

	public LocationRepository() {
		super(Location.class);
	}

	@Override
	public ResourceList<Location> findAll(QuerySpec querySpec) {
		return querySpec.apply(locations.values());
	}

	@Override
	public <S extends Location> S save(S entity) {
		locations.put(entity.getId(), entity);
		return null;
	}

	@Override
	public void delete(String id) {
		locations.remove(id);
	}
}