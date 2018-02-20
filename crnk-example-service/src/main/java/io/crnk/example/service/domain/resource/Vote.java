package io.crnk.example.service.domain.resource;

import io.crnk.core.resource.annotations.JsonApiRelation;
import io.crnk.example.service.domain.entity.MovieEntity;
import java.util.UUID;

import io.crnk.core.resource.annotations.JsonApiId;
import io.crnk.core.resource.annotations.JsonApiResource;

@JsonApiResource(type = "vote")
public class Vote {

	@JsonApiId
	private UUID id;

	@JsonApiRelation
	private MovieEntity movie;

	private int count;

	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public MovieEntity getMovie() {
		return movie;
	}

	public void setMovie(MovieEntity movie) {
		this.movie = movie;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}
}
