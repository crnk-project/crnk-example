package io.crnk.example.service.relationship.dynamic;

import java.time.LocalDateTime;
import java.util.UUID;

import io.crnk.core.queryspec.QuerySpec;
import io.crnk.core.repository.ResourceRepositoryBase;
import io.crnk.core.resource.list.DefaultResourceList;
import io.crnk.core.resource.list.ResourceList;
import org.springframework.stereotype.Component;

/**
 * See AttributeChangeRelationshipRepository for more information/actual use case
 * <p>
 * Mock implementation not doing much. Actual history has to be fetched
 * in real-world implementations
 * </p>
 */
@Component
public class AttributeChangeResourceRepository extends ResourceRepositoryBase<AttributeChange, UUID> {

	protected AttributeChangeResourceRepository() {
		super(AttributeChange.class);
	}

	@Override
	public AttributeChange findOne(UUID id, QuerySpec querySpec) {
		AttributeChange change = new AttributeChange();
		change.setId(id);
		change.setChangeTime(LocalDateTime.now());
		change.setAttribute("mockValue" + id);
		change.setNewValue("new");
		change.setOldValue("old");
		return change;
	}

	@Override
	public ResourceList<AttributeChange> findAll(Iterable<UUID> ids, QuerySpec querySpec) {
		DefaultResourceList list = new DefaultResourceList();
		for (UUID id : ids) {
			AttributeChange change = new AttributeChange();
			change.setId(id);
			change.setChangeTime(LocalDateTime.now());
			change.setAttribute("mockValue" + id);
			change.setNewValue("new");
			change.setOldValue("old");
			list.add(change);
		}
		return list;
	}

	@Override
	public ResourceList<AttributeChange> findAll(QuerySpec querySpec) {
		return new DefaultResourceList();
	}
}
