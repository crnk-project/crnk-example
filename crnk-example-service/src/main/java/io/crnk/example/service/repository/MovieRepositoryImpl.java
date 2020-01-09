package io.crnk.example.service.repository;

import io.crnk.core.queryspec.QuerySpec;
import io.crnk.data.jpa.JpaEntityRepositoryBase;
import io.crnk.data.jpa.JpaRepositoryConfig;
import io.crnk.example.service.model.MovieEntity;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class MovieRepositoryImpl extends JpaEntityRepositoryBase<MovieEntity, UUID> implements MovieRepository {

	public MovieRepositoryImpl() {
		super(JpaRepositoryConfig.builder(MovieEntity.class).setInterfaceClass(MovieRepository.class).build());
		getRepositoryConfig().setTotalAvailable(false);
	}

	@Override
	public MovieEntity save(MovieEntity entity) {
		// add your save logic here
		return super.save(entity);
	}

	@Override
	public MovieEntity create(MovieEntity entity) {
		// add your create logic here
		return super.create(entity);
	}

	@Override
	public void delete(UUID id) {
		// add your save logic here
		super.delete(id);
	}

	@Override
	public MovieRepository.MovieList findAll(QuerySpec querySpec) {
		return (MovieList) super.findAll(querySpec);
	}
}
