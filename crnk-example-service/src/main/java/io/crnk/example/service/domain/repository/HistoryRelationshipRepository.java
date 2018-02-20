package io.crnk.example.service.domain.repository;

import com.google.common.reflect.TypeToken;
import io.crnk.core.engine.information.InformationBuilder;
import io.crnk.core.engine.information.contributor.ResourceFieldContributor;
import io.crnk.core.engine.information.contributor.ResourceFieldContributorContext;
import io.crnk.core.engine.information.resource.ResourceField;
import io.crnk.core.engine.information.resource.ResourceFieldAccessor;
import io.crnk.core.engine.information.resource.ResourceFieldType;
import io.crnk.core.queryspec.QuerySpec;
import io.crnk.core.repository.ReadOnlyRelationshipRepositoryBase;
import io.crnk.core.repository.RelationshipMatcher;
import io.crnk.core.resource.annotations.LookupIncludeBehavior;
import io.crnk.core.resource.list.DefaultResourceList;
import io.crnk.core.resource.list.ResourceList;
import java.io.Serializable;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Component;

/**
 * Generic repository that introduces a history relationship for project and task resource without touching
 * those resources.
 */
@Component
public class HistoryRelationshipRepository extends ReadOnlyRelationshipRepositoryBase<Object, Serializable, History, UUID> {


	@Override
	public RelationshipMatcher getMatcher() {
		return new RelationshipMatcher().rule().target(History.class).add();
	}

	@Override
	public ResourceList<History> findManyTargets(Serializable sourceId, String fieldName, QuerySpec querySpec) {
		DefaultResourceList list = new DefaultResourceList();
		for (int i = 0; i < 10; i++) {
			History history = new History();
			history.setId(UUID.nameUUIDFromBytes(("historyElement" + i).getBytes()));
			history.setNewValue("new" + i);
			history.setOldValue("old" + i);
			list.add(history);
		}
		return list;
	}
}