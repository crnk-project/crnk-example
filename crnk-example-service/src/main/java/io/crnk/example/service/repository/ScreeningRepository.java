package io.crnk.example.service.repository;

import io.crnk.core.queryspec.QuerySpec;
import io.crnk.core.repository.InMemoryResourceRepository;
import io.crnk.core.resource.list.ResourceList;
import io.crnk.example.service.model.Screening;
import org.springframework.stereotype.Component;

import java.util.UUID;

/**
 * Showcases a simple in-memory repository.
 */
@Component
public class ScreeningRepository extends InMemoryResourceRepository<Screening, UUID> {


    public ScreeningRepository() {
        super(Screening.class);
    }

    @Override
    public ResourceList<Screening> findAll(QuerySpec querySpec) {
        // do your logic here
        return super.findAll(querySpec);
    }

    @Override
    public <S extends Screening> S save(S entity) {
        // do your logic here
        return super.save(entity);
    }

    @Override
    public void delete(UUID id) {
        // do your logic here
        super.delete(id);
    }
}