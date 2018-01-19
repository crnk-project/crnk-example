package io.crnk.example.service.simple;

import com.google.common.collect.ImmutableMap;
import com.jayway.restassured.RestAssured;
import com.jayway.restassured.response.ValidatableResponse;
import io.crnk.core.queryspec.QuerySpec;
import io.crnk.core.repository.ResourceRepositoryV2;
import io.crnk.core.resource.list.ResourceList;
import io.crnk.example.service.domain.entity.MovieEntity;
import io.crnk.example.service.domain.resource.ScheduleDto;
import io.crnk.example.service.domain.entity.ScheduleEntity;
import io.crnk.example.service.domain.repository.ProjectRepository.ProjectList;
import io.crnk.example.service.domain.repository.ProjectRepository.ProjectListLinks;
import io.crnk.example.service.domain.repository.ProjectRepository.ProjectListMeta;
import org.apache.catalina.authenticator.jaspic.AuthConfigFactoryImpl;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.http.HttpStatus;

import javax.security.auth.message.config.AuthConfigFactory;
import java.io.Serializable;
import java.util.Map;

import static com.jayway.restassured.module.jsv.JsonSchemaValidator.matchesJsonSchema;
import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

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
	public void testClient() {
		ProjectRepository projectRepo = client.getResourceRepository(ProjectRepository.class);
		QuerySpec querySpec = new QuerySpec(MovieEntity.class);
		querySpec.setLimit(10L);
		ProjectList list = projectRepo.findAll(querySpec);
		Assert.assertNotEquals(0, list.size());

		// test meta access
		ProjectListMeta meta = list.getMeta();
		Assert.assertEquals(4L, meta.getTotalResourceCount().longValue());

		// test pagination links access
		ProjectListLinks links = list.getLinks();
		Assert.assertNotNull(links.getFirst());
	}

	@Test
	public void testJpaEntityAccess() {
		ResourceRepositoryV2<ScheduleEntity, Serializable> entityRepo = client.getQuerySpecRepository(ScheduleEntity.class);

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
		ResourceRepositoryV2<ScheduleDto, Serializable> entityRepo = client.getQuerySpecRepository(ScheduleDto.class);

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
		Assert.assertEquals("MY SCHEDULE", schedule.getUpperName());
	}

	@Test
	public void testFindOne() {
		testFindOne("/api/tasks/1");
		testFindOne("/api/projects/123");
	}

	@Test
	public void testFindOne_NotFound() {
		testFindOne_NotFound("/api/tasks/0");
		testFindOne_NotFound("/api/projects/0");
	}

	@Test
	public void testFindMany() {
		testFindMany("/api/tasks");
		testFindMany("/api/projects");
	}

	@Test
	public void testDelete() {
		testDelete("/api/tasks/1");
		testDelete("/api/projects/123");
	}

	@Test
	public void testCreateTask() {
		Map<String, Object> attributeMap = new ImmutableMap.Builder<String, Object>().put("my-name", "Getter Done")
				.put("description", "12345678901234567890").build();

		Map dataMap = ImmutableMap.of("data", ImmutableMap.of("type", "tasks", "attributes", attributeMap));

		ValidatableResponse response = RestAssured.given().contentType("application/vnd.api+json").body(dataMap).when().post
				("/api/tasks")
				.then().statusCode(CREATED.value());
		response.assertThat().body(matchesJsonSchema(jsonApiSchema));
	}

	@Test
	public void testUpdateTask() {
		Map<String, Object> attributeMap = new ImmutableMap.Builder<String, Object>().put("my-name", "Gotter Did")
				.put("description", "12345678901234567890").build();

		Map dataMap = ImmutableMap.of("data", ImmutableMap.of("type", "tasks", "id", 1, "attributes", attributeMap));

		RestAssured.given().contentType("application/vnd.api+json").body(dataMap).when().patch("/api/tasks/1").then()
				.statusCode(OK.value());
	}

	@Test
	public void testUpdateTask_withDescriptionTooLong() {
		Map<String, Object> attributeMap = new ImmutableMap.Builder<String, Object>().put("description", "123456789012345678901")
				.build();

		Map dataMap = ImmutableMap.of("data", ImmutableMap.of("type", "tasks", "id", 1, "attributes", attributeMap));

		ValidatableResponse response = RestAssured.given().contentType("application/vnd.api+json").body(dataMap).when()
				.patch("/api/tasks/1").then().statusCode(HttpStatus.UNPROCESSABLE_ENTITY.value());
		response.assertThat().body(matchesJsonSchema(jsonApiSchema));
	}

	@Test
	public void testAccessHome() {
		RestAssured.given().contentType("*").when().get("/api/").then()
				.statusCode(OK.value());
	}
}
