package io.crnk.example.service;

import com.jayway.restassured.RestAssured;
import io.crnk.client.CrnkClient;
import io.crnk.core.queryspec.QuerySpec;
import io.crnk.core.repository.ResourceRepositoryV2;
import io.crnk.core.resource.list.ResourceList;
import io.crnk.example.service.basic.Screening;
import io.crnk.example.service.jpa.ScheduleEntity;
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
import java.io.Serializable;
import java.util.Arrays;

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

    @Before
    public void setup() {
        RestAssured.port = port;
        client = new CrnkClient("http://localhost:" + port + "/api");
        client.findModules();

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
