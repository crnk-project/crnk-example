package io.crnk.example.service.jpa;


import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.From;

import io.crnk.core.queryspec.QuerySpec;
import io.crnk.jpa.JpaModuleConfig;
import io.crnk.jpa.JpaRepositoryConfig;
import io.crnk.jpa.mapping.JpaMapper;
import io.crnk.jpa.query.Tuple;
import io.crnk.jpa.query.criteria.JpaCriteriaExpressionFactory;
import io.crnk.jpa.query.criteria.JpaCriteriaQueryFactory;
import io.crnk.spring.setup.boot.jpa.JpaModuleConfigurer;
import org.springframework.stereotype.Component;

@Component
public class ExampleJpaModuleConfigurer implements JpaModuleConfigurer {

	@PersistenceContext
	private EntityManager em;

	/**
	 * Expose JPA entities as repositories.
	 *
	 * @return module
	 */

	@Override
	public void configure(JpaModuleConfig config) {
		// directly expose entity 1:1 as JSON:API resource
		config.addRepository(JpaRepositoryConfig.builder(ScheduleEntity.class).build());
		config.addRepository(JpaRepositoryConfig.builder(MovieEntity.class).build());
		config.addRepository(JpaRepositoryConfig.builder(RoleEntity.class).build());
		config.addRepository(JpaRepositoryConfig.builder(PersonEntity.class).build());

		// map ScheduleEntity to a ScheduleDto with ScheduleMapper can do arbitrary mappings.
		config.addRepository(
				JpaRepositoryConfig.builder(ScheduleEntity.class, ScheduleDto.class, new ScheduleMapper()).build());

		JpaCriteriaQueryFactory queryFactory = (JpaCriteriaQueryFactory) config.getQueryFactory();

		// register a computed a attribute to automatically fill upperName with the upper-cased name
		// => you may consider QueryDSL or generating Criteria query objects to keep type-safety.
		// => you may also create arbitrary complex expressions with subqueries, etc.
		JpaCriteriaExpressionFactory upperNameExpr = (JpaCriteriaExpressionFactory<From<?, ScheduleEntity>>) (entity, query) -> {
			CriteriaBuilder builder = em.getCriteriaBuilder();
			return builder.upper((Expression) entity.get("name"));
		};
		queryFactory.registerComputedAttribute(ScheduleEntity.class, "upperName", String.class,
				upperNameExpr);
	}


	class ScheduleMapper implements JpaMapper<ScheduleEntity, ScheduleDto> {

		@Override
		public ScheduleDto map(Tuple tuple) {
			ScheduleDto dto = new ScheduleDto();

			// first entry in tuple is the queried entity (if not configured otherwise)
			ScheduleEntity entity = tuple.get(0, ScheduleEntity.class);
			dto.setId(entity.getId());
			dto.setName(entity.getName());

			// computed attribute available as additional tuple entry
			dto.setComputedUpperName(tuple.get(1, String.class));
			return dto;
		}

		@Override
		public ScheduleEntity unmap(ScheduleDto dto) {
			// get entity from database if already there
			ScheduleEntity entity = em.find(ScheduleEntity.class, dto.getId());
			if (entity == null) {
				entity = new ScheduleEntity();
				entity.setId(dto.getId());
			}
			entity.setName(dto.getName());
			return entity;
		}

		@Override
		public QuerySpec unmapQuerySpec(QuerySpec dtoQuerySpec) {
			// if the DTOs introduces new naming, querySpec must be updated as well.
			return dtoQuerySpec;
		}
	}
}
