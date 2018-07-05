package io.crnk.example.service.decorator;

import java.io.Serializable;

import io.crnk.core.module.Module;
import io.crnk.core.repository.ResourceRepositoryV2;
import io.crnk.core.repository.decorate.RepositoryDecoratorFactoryBase;
import io.crnk.core.repository.decorate.ResourceRepositoryDecorator;
import io.crnk.example.service.jpa.ScheduleDto;
import org.springframework.stereotype.Component;

/**
 * sets up an ExampleDecorator to enrich ScheduleDto with a further value. Can be used to intercept and modify
 * requests in an arbitrary fashion.
 * <p>
 * TODO implement support to lookup decoratorFactory with Spring without module
 */
@Component
public class ExampleDecoratorModule implements Module {

	@Override
	public String getModuleName() {
		return "exampleDecorator";
	}

	@Override
	public void setupModule(ModuleContext context) {
		context.addRepositoryDecoratorFactory(new RepositoryDecoratorFactoryBase() {
			@Override
			public <T, I extends Serializable> ResourceRepositoryDecorator<T, I> decorateRepository(
					ResourceRepositoryV2<T, I> repository) {
				if (repository.getResourceClass() == ScheduleDto.class) {
					return (ResourceRepositoryDecorator<T, I>) new ExampleDecorator();
				}
				return null;
			}
		});
	}
}
