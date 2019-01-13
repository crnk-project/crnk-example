package io.crnk.example.service.decorator;

import io.crnk.core.queryspec.QuerySpec;
import io.crnk.core.repository.decorate.ResourceRepositoryDecoratorBase;
import io.crnk.core.resource.list.ResourceList;
import io.crnk.example.service.jpa.ScheduleEntity;

/**
 * The decorator is registered through ExampleDecoratorFactory. It intercepts all calls to
 * ScheduleRepository and updates the name to upper case.
 */
public class ExampleDecorator extends ResourceRepositoryDecoratorBase<ScheduleEntity, Long> {

    @Override
    public ResourceList<ScheduleEntity> findAll(Iterable<Long> ids, QuerySpec querySpec) {
        return decoratedObject.findAll(ids, querySpec);
    }

    @Override
    public ScheduleEntity findOne(Long id, QuerySpec querySpec) {
        ScheduleEntity entity = decoratedObject.findOne(id, querySpec);
        entity.setName(entity.getName().toUpperCase());
        return entity;
    }

    @Override
    public ResourceList<ScheduleEntity> findAll(QuerySpec querySpec) {
        ResourceList<ScheduleEntity> list = decoratedObject.findAll(querySpec);
        for (ScheduleEntity entity : list) {
            entity.setName(entity.getName().toUpperCase());
        }
        return list;
    }
}
