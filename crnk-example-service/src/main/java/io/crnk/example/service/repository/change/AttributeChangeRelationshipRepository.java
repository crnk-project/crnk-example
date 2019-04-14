package io.crnk.example.service.repository.change;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

import io.crnk.core.queryspec.QuerySpec;
import io.crnk.core.repository.ReadOnlyRelationshipRepositoryBase;
import io.crnk.core.repository.RelationshipMatcher;
import io.crnk.core.resource.list.DefaultResourceList;
import io.crnk.core.resource.list.ResourceList;
import io.crnk.example.service.model.AttributeChange;
import org.springframework.stereotype.Component;

/**
 * Generic repository that introduces a history relationship for project and task resource without touching
 * those resources.
 *
 * <p>
 * Mock implementation not doing much. Actual history has to be fetched
 * in real-world implementations
 * </p>
 */
@Component
public class AttributeChangeRelationshipRepository
		extends ReadOnlyRelationshipRepositoryBase<Object, Serializable, AttributeChange, UUID> {


	@Override
	public RelationshipMatcher getMatcher() {
		return new RelationshipMatcher().rule().target(AttributeChange.class).add();
	}

	@Override
	public ResourceList<AttributeChange> findManyTargets(Serializable sourceId, String fieldName, QuerySpec querySpec) {
		DefaultResourceList list = new DefaultResourceList();
		for (int i = 0; i < 10; i++) {
			AttributeChange change = new AttributeChange();
			change.setId(UUID.nameUUIDFromBytes(("historyElement" + i).getBytes()));
			change.setAttribute("mockValue" + i);
			change.setChangeTime(LocalDateTime.now());
			change.setNewValue("new" + i);
			change.setOldValue("old" + i);
			list.add(change);
		}
		return list;
	}
}