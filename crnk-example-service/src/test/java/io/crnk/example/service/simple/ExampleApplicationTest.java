package io.crnk.example.service.simple;

import static org.springframework.http.HttpStatus.OK;

import java.io.Serializable;
import java.util.Arrays;
import javax.security.auth.message.config.AuthConfigFactory;

import com.jayway.restassured.RestAssured;
import io.crnk.core.queryspec.QuerySpec;
import io.crnk.core.repository.ResourceRepositoryV2;
import io.crnk.core.resource.list.ResourceList;
import io.crnk.example.service.basic.Screening;
import io.crnk.example.service.jpa.ScheduleDto;
import io.crnk.example.service.jpa.ScheduleEntity;
import org.apache.catalina.authenticator.jaspic.AuthConfigFactoryImpl;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

/**
 * Shows two kinds of test cases: RestAssured and CrnkClient.
 */
public class ExampleApplicationTest extends BaseTest {

	@Before
	public void setup() {
		// NPE fix
		if (AuthConfigFactory.getFactory() == null) {
			AuthConfigFactory.setFactory(new AuthConfigFactoryImpl());
		}
	}

	@Test
	public void testJpaEntityAccess() {
		ResourceRepositoryV2<ScheduleEntity, Serializable> entityRepo = client.getRepositoryForType(ScheduleEntity.class);

		QuerySpec querySpec = new QuerySpec(ScheduleEntity.class);
		ResourceList<ScheduleEntity> list = entityRepo.findAll(querySpec);
		for (ScheduleEntity schedule : list) {
			entityRepo.delete(schedule.getId());
		}

		ScheduleEntity schedule = new ScheduleEntity();
		schedule.setId(13L);
		schedule.setName("My Schedule");
		entityRepo.create(schedule);

		list = entityRepo.findAll(querySpec);
		Assert.assertEquals(1, list.size());
	}

	@Test
	public void testDtoMapping() {
		ResourceRepositoryV2<ScheduleDto, Serializable> entityRepo = client.getRepositoryForType(ScheduleDto.class);

		QuerySpec querySpec = new QuerySpec(ScheduleDto.class);
		ResourceList<ScheduleDto> list = entityRepo.findAll(querySpec);
		for (ScheduleDto schedule : list) {
			entityRepo.delete(schedule.getId());
		}

		ScheduleDto schedule = new ScheduleDto();
		schedule.setId(13L);
		schedule.setName("My Schedule");
		entityRepo.create(schedule);

		list = entityRepo.findAll(querySpec);
		Assert.assertEquals(1, list.size());
		schedule = list.get(0);
		Assert.assertEquals(13L, schedule.getId().longValue());
		Assert.assertEquals("My Schedule", schedule.getName());

		// a computed attribute!
		Assert.assertEquals("MY SCHEDULE", schedule.getComputedUpperName());

		// a decorated attribute!
		Assert.assertEquals("decoratedFindAll", schedule.getDecoratedName());
	}

	@Test
	public void testAccessHome() {
		RestAssured.given().contentType("*").when().get("/api/").then()
				.statusCode(OK.value());
	}


	@Test
	public void testBasicRelationship() {
		QuerySpec querySpec = new QuerySpec(Screening.class);
		querySpec.includeRelation(Arrays.asList("location"));
		ResourceRepositoryV2<Screening, Serializable> repository = client.getRepositoryForType(Screening.class);
		ResourceList<Screening> list = repository.findAll(querySpec);
		Assert.assertNotEquals(0, list.size());
		for (Screening screening : list) {
			Assert.assertNotNull(screening.getLocation());
		}
	}
}
