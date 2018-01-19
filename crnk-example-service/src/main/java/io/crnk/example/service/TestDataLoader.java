package io.crnk.example.service;

import java.util.Arrays;
import java.util.List;
import java.util.concurrent.Callable;
import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import io.crnk.core.engine.transaction.TransactionRunner;
import io.crnk.example.service.domain.entity.MovieEntity;
import io.crnk.example.service.domain.entity.ScheduleEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TestDataLoader {

	private long nextId = 1;

	@Autowired
	private EntityManager em;

	@Autowired
	private TransactionRunner transactionRunner;

	@Autowired
	private ObjectMapper objectMapper;

	@PostConstruct
	public void setup() {
		transactionRunner.doInTransaction(new Callable<Object>() {
			@Override
			public Object call() throws Exception {
				createMovie("The Accountant", 2016, Arrays.asList("Ben Affleck", "Anna Kendrick"));
				createMovie("Iron Man", 2008, Arrays.asList("Robert Downey Jr.", "Terrence Howard", "Jeff Bridges"));
				createMovie("Titanic", 1997, Arrays.asList("Leonardo DiCaprio", "Kate Winslet"));
				createMovie("Mr. & Mrs. Smith", 2005, Arrays.asList("Brad Pitt", "Angelina Jolie"));

				for (int i = 0; i < 10; i++) {
					ScheduleEntity scheduleEntity = new ScheduleEntity();
					scheduleEntity.setId((long) i);
					scheduleEntity.setName("schedule" + i);
					em.persist(scheduleEntity);
				}
				em.flush();
				return null;
			}
		});
	}

	@PostConstruct
	public void configureJackson() {
		objectMapper.enable(SerializationFeature.INDENT_OUTPUT);
	}

	protected MovieEntity createMovie(String title, int year, List<String> actors) {
		MovieEntity movie = new MovieEntity();
		movie.setId(nextId++);
		movie.setName(title);
		em.persist(movie);
		return movie;
	}
}
