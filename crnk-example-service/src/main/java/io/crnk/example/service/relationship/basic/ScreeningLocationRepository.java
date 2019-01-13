package io.crnk.example.service.relationship.basic;

import io.crnk.core.queryspec.QuerySpec;
import io.crnk.core.repository.RelationshipRepositoryV2;
import io.crnk.core.resource.list.ResourceList;
import io.crnk.example.service.basic.Location;
import io.crnk.example.service.basic.LocationRepository;
import io.crnk.example.service.basic.Screening;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.UUID;

/**
 * Establishes a relationship between screenings and location.
 */
@Component
public class ScreeningLocationRepository implements RelationshipRepositoryV2<Screening, UUID, Location, String> {

    private LocationRepository locationRepository;

    @Autowired
    public ScreeningLocationRepository(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    @Override
    public Class<Screening> getSourceResourceClass() {
        return Screening.class;
    }

    @Override
    public Class<Location> getTargetResourceClass() {
        return Location.class;
    }

    @Override
    public Location findOneTarget(UUID sourceId, String fieldName, QuerySpec querySpec) {
        // a real-world implementation would do something more reasonable here...
        ResourceList<Location> list = locationRepository.findAll(querySpec);
        return list.isEmpty() ? null : list.get(0);
    }

    @Override
    public void setRelation(Screening source, String targetId, String fieldName) {
        throw new UnsupportedOperationException();
    }

    @Override
    public void setRelations(Screening source, Iterable<String> targetIds, String fieldName) {
        throw new UnsupportedOperationException();
    }

    @Override
    public void addRelations(Screening source, Iterable<String> targetIds, String fieldName) {
        throw new UnsupportedOperationException();
    }

    @Override
    public void removeRelations(Screening source, Iterable<String> targetIds, String fieldName) {
        throw new UnsupportedOperationException();
    }

    @Override
    public ResourceList findManyTargets(UUID sourceId, String fieldName, QuerySpec querySpec) {
        throw new UnsupportedOperationException();
    }
}
