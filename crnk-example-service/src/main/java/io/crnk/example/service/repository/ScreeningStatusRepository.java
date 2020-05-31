package io.crnk.example.service.repository;

import io.crnk.core.queryspec.FilterSpec;
import io.crnk.core.queryspec.PathSpec;
import io.crnk.core.queryspec.QuerySpec;
import io.crnk.core.repository.ResourceRepositoryBase;
import io.crnk.core.resource.annotations.JsonApiExposed;
import io.crnk.core.resource.list.DefaultResourceList;
import io.crnk.core.resource.list.ResourceList;
import io.crnk.example.service.model.ScreeningStatus;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Collections;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Showcases a simple in-memory repository.
 */
@Component
@JsonApiExposed(false)
public class ScreeningStatusRepository extends ResourceRepositoryBase<ScreeningStatus, UUID> {

    private ConcurrentHashMap<UUID, ScreeningStatus> map = new ConcurrentHashMap<>();

    public ScreeningStatusRepository() {
        super(ScreeningStatus.class);
    }

    @Override
    public ScreeningStatus create(ScreeningStatus status) {
        map.put(status.getScreeningId(), status);
        return status;
    }

    /**
     * Retrieve status if ID has been passed in QuerySpec. Does not allow generic findAll without filters (for the time being).
     * Sufficient to retrieve the status for a screening.
     */
    @Override
    public ResourceList<ScreeningStatus> findAll(QuerySpec querySpec) {
        Optional<FilterSpec> filterSpec = querySpec.findFilter(PathSpec.of("screening.id"));
        if (!filterSpec.isPresent()) {
            filterSpec = querySpec.findFilter(PathSpec.of("screeningId"));
        }
        if (filterSpec.isPresent()) {
            Collection<UUID> ids = toCollection(filterSpec.get().getValue());

            DefaultResourceList list = new DefaultResourceList();
            for (UUID id : ids) {
                ScreeningStatus status = map.get(id);
                if (status == null) {
                    status = new ScreeningStatus();
                    status.setScreeningId(id);
                    status.setDescription("Currently running");
                }
                list.add(status);
            }
            return querySpec.apply(list);
        } else {
            throw new UnsupportedOperationException();
        }
    }

    private Collection<UUID> toCollection(Object value) {
        return (value instanceof Collection) ? (Collection<UUID>) value : Collections.singleton((UUID) value);
    }


}