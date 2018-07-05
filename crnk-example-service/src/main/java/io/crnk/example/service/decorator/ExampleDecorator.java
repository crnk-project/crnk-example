package io.crnk.example.service.decorator;

import io.crnk.core.queryspec.QuerySpec;
import io.crnk.core.repository.decorate.ResourceRepositoryDecoratorBase;
import io.crnk.core.resource.list.ResourceList;
import io.crnk.example.service.jpa.ScheduleDto;

/**
 * See ExampleDecoratorModule for more information.
 */
public class ExampleDecorator extends ResourceRepositoryDecoratorBase<ScheduleDto, Long> {

	@Override
	public ResourceList<ScheduleDto> findAll(Iterable<Long> ids, QuerySpec querySpec) {
		return decoratedObject.findAll(ids, querySpec);
	}

	@Override
	public ScheduleDto findOne(Long id, QuerySpec querySpec) {
		ScheduleDto dto = decoratedObject.findOne(id, querySpec);
		dto.setDecoratedName("decoratedFindOne");
		return dto;
	}

	@Override
	public ResourceList<ScheduleDto> findAll(QuerySpec querySpec) {
		ResourceList<ScheduleDto> list = decoratedObject.findAll(querySpec);
		for (ScheduleDto dto : list) {
			dto.setDecoratedName("decoratedFindAll");
		}
		return list;
	}
}
