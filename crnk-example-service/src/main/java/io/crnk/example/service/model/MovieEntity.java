package io.crnk.example.service.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.crnk.core.resource.annotations.JsonApiLinksInformation;
import io.crnk.core.resource.links.LinksInformation;
import io.crnk.core.resource.annotations.JsonApiRelation;
import io.crnk.core.resource.annotations.JsonApiResource;
import io.crnk.data.facet.annotation.Facet;
import lombok.Data;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Transient;
import javax.persistence.Version;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Represents a <b>movie</b>. This comment also demonstrates some HTML-to-asciidoc conversion within crnk-asciidoc.
 *
 * This is a list:
 * <ul>
 *     <li>Some</li>
 *     <li>List</li>
 *     <li>Elements</li>
 * </ul>
 * This is a new <br> line.
 * <p>This is a paragraph</p>
 * This is a link: <a href="http://www.google.com">Google</a>
 */
@JsonApiResource(type = "movie")
@Entity
@Data
public class MovieEntity {

	@Id
	private UUID id;

	@JsonProperty
	@NotEmpty
	private String name;

	@Facet
	private int year;

	@OneToMany(mappedBy = "movie")
	private List<RoleEntity> roles = new ArrayList<>();

	/**
	 * A link to a non-JPA resource. Served from the other side through the mappedBy-declartion.
	 * Must be transient to not get persisted.
	 */
	@Transient
	@JsonApiRelation(mappedBy = "movie")
	private List<Vote> votes = new ArrayList<>();

	@Version
	private Integer version;

    @Transient
    @JsonApiLinksInformation
    private MovieLinks links;
	
	public void setId(UUID id)
	{
		this.id = id;
		links = new MovieLinks(id);
	}
	
    public static class MovieLinks implements  LinksInformation
    {
    
    	public MovieLinks(UUID movieID)
    	{
    		this.movieID = movieID;
    		
    	}
    	private movieID;
    	private String rates;
    	private String comments;
    
		public String getRates() {
			
			return "https://www.imdb.com/" + movieID + "/rates";
		}
    	
    	public void setRates(String rates){
    		this.rates = rates;
    	}
    	
    	public String getComments() {
			
		 	return "https://www.imdb.com/" + movieID + "/comments";
		}
    	
    	public void setComments(String comments){
    		this.comments = comments;
    	}
	
	 }


}
