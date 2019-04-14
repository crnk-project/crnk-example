package io.crnk.example.service.repository.schedule;

import io.crnk.core.queryspec.QuerySpec;
import io.crnk.core.repository.decorate.WrappedResourceRepository;
import io.crnk.core.resource.list.ResourceList;
import io.crnk.example.service.model.ScheduleEntity;

/**
 * The decorator is registered through ScheduleDecoratorFactory. It intercepts all calls to
 * ScheduleRepository and updates the name to upper case.
 */
public class ScheduleDecorator extends WrappedResourceRepository<ScheduleEntity, Long> {

    public ScheduleDecorator(ScheduleRepository repository) {
        super(repository);
    }

    @Override
    public ScheduleEntity findOne(Long id, QuerySpec querySpec) {
        ScheduleEntity entity = wrappedRepository.findOne(id, querySpec);
        entity.setDescription(entity.getDescription().toUpperCase());
        return entity;
    }

    @Override
    public ResourceList<ScheduleEntity> findAll(QuerySpec querySpec) {
        ResourceList<ScheduleEntity> list = wrappedRepository.findAll(querySpec);
        for (ScheduleEntity entity : list) {
            entity.setDescription(entity.getDescription().toUpperCase());
        }
        return list;
    }
}
