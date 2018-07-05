package io.crnk.example.service.jpa;

import io.crnk.core.resource.annotations.JsonApiId;
import io.crnk.core.resource.annotations.JsonApiResource;

@JsonApiResource(type = "scheduleDto")
public class ScheduleDto {

	@JsonApiId
	private Long id;

	private String name;

	/**
	 * See ExampleJpaModuleConfigurer how a JPA Criteria expression is used to fill-up this attribute
	 */
	private String computedUpperName;

	/**
	 * See ExampleDecoratorFactory how this attribute is filled-up by a decorator.
	 */
	private String decoratedName;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getComputedUpperName() {
		return computedUpperName;
	}

	public void setComputedUpperName(String computedUpperName) {
		this.computedUpperName = computedUpperName;
	}

	public String getDecoratedName() {
		return decoratedName;
	}

	public void setDecoratedName(String decoratedName) {
		this.decoratedName = decoratedName;
	}
}
