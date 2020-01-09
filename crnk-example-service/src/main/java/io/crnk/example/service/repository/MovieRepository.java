package io.crnk.example.service.repository;

import io.crnk.core.queryspec.QuerySpec;
import io.crnk.core.repository.ResourceRepository;
import io.crnk.core.resource.links.DefaultPagedLinksInformation;
import io.crnk.core.resource.links.LinksInformation;
import io.crnk.core.resource.list.ResourceListBase;
import io.crnk.core.resource.meta.HasMoreResourcesMetaInformation;
import io.crnk.example.service.model.MovieEntity;
import lombok.Data;

import java.util.UUID;

/**
 * Interface to a list of movies with type-safe access to links and meta data. Can be used
 * by Crnk-client or any other internal consumer of the repository.
 */
public interface MovieRepository extends ResourceRepository<MovieEntity, UUID> {

	MovieList findAll(QuerySpec querySpec);

	class MovieList extends ResourceListBase<MovieEntity, ScheduleListMeta, ScheduleListLinks> {

	}

	@Data
	class ScheduleListLinks extends DefaultPagedLinksInformation implements LinksInformation {

		public String externalLink = "https://www.imdb.com/";
	}

	/**
	 * With the use of {@link HasMoreResourcesMetaInformation} we do not offer a last page link,
	 * only first, previous and next. This allows to skip total row count computation with a second,
	 * potentially expensive query.
	 */
	@Data
	class ScheduleListMeta implements HasMoreResourcesMetaInformation {

		public Boolean hasMoreResources;

	}

}
