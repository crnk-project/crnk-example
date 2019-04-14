package io.crnk.example.service.repository.change;

import io.crnk.core.queryspec.QuerySpec;
import io.crnk.core.repository.ResourceRepositoryBase;
import io.crnk.core.resource.list.DefaultResourceList;
import io.crnk.core.resource.list.ResourceList;
import io.crnk.example.service.model.AttributeChange;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.UUID;

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
    public ResourceList<AttributeChange> findAll(Collection<UUID> ids, QuerySpec querySpec) {
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
