package io.crnk.example.service.repository;

import io.crnk.core.queryspec.QuerySpec;
import io.crnk.core.repository.OneRelationshipRepositoryBase;
import io.crnk.core.repository.RelationshipMatcher;
import io.crnk.core.resource.list.ResourceList;
import io.crnk.example.service.model.Location;
import io.crnk.example.service.model.Screening;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * Establishes a custom relationship between screenings and location.
 */
@Component
public class ScreeningLocationRepository extends OneRelationshipRepositoryBase<Screening, UUID, Location, String> {

    private LocationRepository locationRepository;

    @Autowired
    public ScreeningLocationRepository(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    @Override
    public RelationshipMatcher getMatcher() {
        RelationshipMatcher matcher = new RelationshipMatcher();
        matcher.rule().source(Screening.class).target(Location.class).add();
        return matcher;
    }

    @Override
    public void setRelation(Screening source, String targetId, String fieldName) {
        throw new UnsupportedOperationException();
    }

    @Override
    public Map<UUID, Location> findOneRelations(Collection<UUID> sourceIds, String fieldName, QuerySpec querySpec) {
        Map<UUID, Location> map = new HashMap<>();
        for (UUID sourceId : sourceIds) {
            // a real-world implementation would do something more reasonable here...
            ResourceList<Location> list = locationRepository.findAll(querySpec);
            map.put(sourceId, list.isEmpty() ? null : list.get(0));
        }
        return map;
    }
}
