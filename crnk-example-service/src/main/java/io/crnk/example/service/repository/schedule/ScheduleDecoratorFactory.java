package io.crnk.example.service.repository.schedule;

import io.crnk.core.repository.decorate.RepositoryDecoratorFactory;
import org.springframework.stereotype.Component;

/**
 * sets up an ScheduleDecorator to intercepts and modifies any request for ScheduleEntity.
 * with a further value. Can be used to intercept and modify
 * requests in an arbitrary fashion.
 */
@Component
public class ScheduleDecoratorFactory implements RepositoryDecoratorFactory {

    @Override
    public Object decorateRepository(Object repository) {
        if (repository instanceof ScheduleRepository) {
            return new ScheduleDecorator((ScheduleRepository) repository);
        }
        return repository;
    }
}