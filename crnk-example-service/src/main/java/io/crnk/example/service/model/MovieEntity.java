package io.crnk.example.service.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.crnk.core.resource.annotations.JsonApiLinksInformation;
import io.crnk.core.resource.links.SelfLinksInformation;
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
	
    //This is an example on links customization.
	//The links object in the response will look like
	//"links":{"rates":"https://www.imdb.com/{MovieID}/rates", "comments":"https://www.imdb.com/{MovieID}/comments" }
	//You can find that there is no self link type here, If you want to add it beside your customization just remove the comments below.
    @Transient
    @JsonApiLinksInformation
    private MovieLinks links = new MovieLinks();

    public class MovieLinks implements  LinksInformation//,SelfLinksInformation
    {
		//private String self;
    	private String rates;
    	private String comments;
    
		public String getRates() {
			if (rates == null)
				return "https://www.imdb.com/" + getId() + "/rates"; 
			return rates;
		}
    	
    	public void setRates(String rates){
    		this.rates = rates;
    	}
    	
    	public String getComments() {
			if (comments == null)
		 		return "https://www.imdb.com/" + getId() + "/comments";
			return comments;
		}
    	
    	public void setComments(String comments){
    		this.comments = comments;
    	}
		/*
		@Override
		public Link getSelf() {
			if(self == null)
				return new DefaultLink("/movie/" + getId());
			return self;
		}

		@Override
		public void setSelf(Link self) {
			this.self = self.getHref(); 
		}
		*/
	
	 }


}
