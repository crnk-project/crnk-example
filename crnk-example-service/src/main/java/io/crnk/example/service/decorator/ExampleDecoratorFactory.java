package io.crnk.example.service.decorator;

import io.crnk.core.repository.ResourceRepositoryV2;
import io.crnk.core.repository.decorate.RepositoryDecoratorFactoryBase;
import io.crnk.core.repository.decorate.ResourceRepositoryDecorator;
import io.crnk.example.service.jpa.ScheduleEntity;
import org.springframework.stereotype.Component;

import java.io.Serializable;

/**
 * sets up an ExampleDecorator to intercepts and modifies any request for ScheduleEntity.
 * with a further value. Can be used to intercept and modify
 * requests in an arbitrary fashion.
 */
@Component
public class ExampleDecoratorFactory extends RepositoryDecoratorFactoryBase {

    @Override
    public <T, I extends Serializable> ResourceRepositoryDecorator<T, I> decorateRepository(
            ResourceRepositoryV2<T, I> repository) {
        if (repository.getResourceClass() == ScheduleEntity.class) {
            return (ResourceRepositoryDecorator<T, I>) new ExampleDecorator();
        }
        return null;
    }
}