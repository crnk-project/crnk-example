package io.crnk.example.service.domain.repository;

import java.util.UUID;

import io.crnk.core.queryspec.QuerySpec;
import io.crnk.core.repository.ResourceRepositoryBase;
import io.crnk.core.resource.list.DefaultResourceList;
import io.crnk.core.resource.list.ResourceList;
import org.springframework.stereotype.Component;

/**
 * See HistoryRelationshipRepository for more information/actual use case
 * <p>
 * Basic implementation not doing much. Actual history has to be fetched
 * in real-world implementations
 * </p>
 */
@Component
public class HistoryResourceRepository extends ResourceRepositoryBase<History, UUID> {

	protected HistoryResourceRepository() {
		super(History.class);
	}

	@Override
	public History findOne(UUID id, QuerySpec querySpec) {
		History history = new History();
		history.setId(id);
		history.setNewValue("test");
		history.setOldValue("test");
		return history;
	}

	@Override
	public ResourceList<History> findAll(Iterable<UUID> ids, QuerySpec querySpec) {
		DefaultResourceList list = new DefaultResourceList();
		for (UUID id : ids) {
			History history = new History();
			history.setId(id);
			history.setNewValue("test");
			history.setOldValue("test");
			list.add(history);
		}
		return list;
	}

	@Override
	public ResourceList<History> findAll(QuerySpec querySpec) {
		return new DefaultResourceList();
	}
}
