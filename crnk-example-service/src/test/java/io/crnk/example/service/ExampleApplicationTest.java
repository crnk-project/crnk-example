package io.crnk.example.service;

import com.jayway.restassured.RestAssured;
import io.crnk.client.CrnkClient;
import io.crnk.core.queryspec.QuerySpec;
import io.crnk.core.repository.ResourceRepository;
import io.crnk.core.resource.list.ResourceList;
import io.crnk.example.service.model.Login;
import io.crnk.example.service.model.MovieEntity;
import io.crnk.example.service.model.PersonEntity;
import io.crnk.example.service.model.ScheduleEntity;
import io.crnk.example.service.model.Screening;
import io.crnk.example.service.repository.MovieRepository;
import io.crnk.format.plainjson.PlainJsonFormatModule;
import io.crnk.gen.asciidoc.capture.AsciidocCaptureConfig;
import io.crnk.gen.asciidoc.capture.AsciidocCaptureModule;
import org.apache.catalina.authenticator.jaspic.AuthConfigFactoryImpl;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringRunner;

import javax.security.auth.message.config.AuthConfigFactory;
import java.io.File;
import java.io.Serializable;
import java.util.Arrays;
import java.util.Map;
import java.util.UUID;

import static org.springframework.http.HttpStatus.OK;

/**
 * Showcases CrnkClient-based and low-level RestAssured test cases.
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ExampleApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@DirtiesContext
public class ExampleApplicationTest {

	@Value("${local.server.port}")
	protected int port;

	protected CrnkClient client;

	private AsciidocCaptureModule docs;

	@Before
	public void setup() {
		RestAssured.port = port;

		docs = setupAsciidoc();

		client = new CrnkClient("http://localhost:" + port + "/api");
		client.addModule(docs);
		client.addModule(new PlainJsonFormatModule());
		client.findModules();

		// NPE fix
		if (AuthConfigFactory.getFactory() == null) {
			AuthConfigFactory.setFactory(new AuthConfigFactoryImpl());
		}
	}

	private AsciidocCaptureModule setupAsciidoc() {
		File outputDir = new File("build/generated/sources/asciidoc");
		AsciidocCaptureConfig asciidocConfig = new AsciidocCaptureConfig();
		asciidocConfig.setGenDir(outputDir);
		asciidocConfig.setPortOverride(8080);
		return new AsciidocCaptureModule(asciidocConfig);
	}


	@Test
	public void testJpaEntityAccess() {
		ResourceRepository<ScheduleEntity, Serializable> entityRepo = client.getRepositoryForType(ScheduleEntity.class);

		QuerySpec querySpec = new QuerySpec(ScheduleEntity.class);
		ResourceList<ScheduleEntity> list = entityRepo.findAll(querySpec);
		for (ScheduleEntity schedule : list) {
			entityRepo.delete(schedule.getId());
		}

		ScheduleEntity schedule = new ScheduleEntity();
		schedule.setId(13L);
		schedule.setDescription("My Schedule");
		docs.capture("Create Schedule").call(() -> entityRepo.create(schedule));

		list = entityRepo.findAll(querySpec);
		Assert.assertEquals(1, list.size());
	}

	@Test
	public void testJsonApiSetter() {
		ResourceRepository<PersonEntity, Serializable> entityRepo = client.getRepositoryForType(PersonEntity.class);

		QuerySpec querySpec = new QuerySpec(PersonEntity.class);
		ResourceList<PersonEntity> list = entityRepo.findAll(querySpec);
		for (PersonEntity person : list) {
			Map<String, String> properties = person.getProperties();
			Assert.assertNotEquals(0, properties.size());
		}

		PersonEntity person = new PersonEntity();
		person.setId(UUID.randomUUID());
		person.setName("john doe");
		person.setProperties("todo", "My Schedule");
		entityRepo.create(person);

		person = entityRepo.findOne(person.getId(), querySpec);
		Assert.assertEquals(1, person.getProperties().size());
	}

	@Test
	public void testFindLogin() {
		ResourceRepository<Login, Object> repository = client.getRepositoryForType(Login.class);
		Login login = docs.capture("Get Login Information").call(() -> repository.findOne("me", new QuerySpec(Login.class)));
		Assert.assertNotNull(login);
	}

	@Test
	public void testCreateMovie() {
		String title = "Avengers: Endgame";
		MovieEntity movie = new MovieEntity();
		movie.setId(UUID.nameUUIDFromBytes(title.getBytes()));
		movie.setName(title);
		movie.setYear(2019);

		MovieRepository repository = client.getRepositoryForInterface(MovieRepository.class);
		docs.capture("Get Login Information").call(() -> repository.create(movie));

		QuerySpec querySpec = new QuerySpec(MovieEntity.class);
		querySpec.setLimit(2L);
		MovieRepository.MovieList movies = repository.findAll(querySpec);
		Assert.assertNotNull(movies);
		MovieRepository.ScheduleListLinks links = movies.getLinks();
		Assert.assertNotNull(links.getFirst());
		Assert.assertNull(links.getPrev());
		Assert.assertNotNull(links.getNext());
		Assert.assertNull(links.getLast()); // we make use of HasMoreResourcesMetaInformation!
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
		ResourceRepository<Screening, Serializable> repository = client.getRepositoryForType(Screening.class);
		ResourceList<Screening> list = repository.findAll(querySpec);
		Assert.assertNotEquals(0, list.size());
		for (Screening screening : list) {
			Assert.assertNotNull(screening.getLocation());
		}
	}
}
