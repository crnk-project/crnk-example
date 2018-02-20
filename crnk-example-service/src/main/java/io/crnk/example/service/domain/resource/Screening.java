package io.crnk.example.service.domain.resource;

import io.crnk.core.resource.annotations.JsonApiId;
import io.crnk.core.resource.annotations.JsonApiRelation;
import io.crnk.core.resource.annotations.JsonApiRelationId;
import io.crnk.core.resource.annotations.JsonApiResource;
import io.crnk.core.resource.annotations.LookupIncludeBehavior;
import io.crnk.core.resource.annotations.SerializeType;
import io.crnk.example.service.domain.entity.MovieEntity;
import java.util.UUID;

@JsonApiResource(type = "screening")
public class Screening {

	@JsonApiId
	private UUID id;

	@JsonApiRelationId
	private UUID movieId;

	@JsonApiRelation(
			serialize = SerializeType.ONLY_ID,
			lookUp = LookupIncludeBehavior.AUTOMATICALLY_WHEN_NULL
	)
	private MovieEntity movie;

	private String location;

	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public UUID getMovieId() {
		return movieId;
	}

	public void setMovieId(UUID movieId) {
		this.movieId = movieId;

		// movie reference becomes invalid
		this.movie = null;
	}

	public MovieEntity getMovie() {
		return movie;
	}

	public void setMovie(MovieEntity movie) {
		this.movie = movie;
		this.movieId = movie != null ? movie.getId() : null;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}
}
