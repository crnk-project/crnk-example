package io.crnk.example.service.model;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.crnk.core.resource.annotations.JsonApiResource;
import lombok.Data;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Version;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * Represents a person involed with a movie through roles.
 */
@JsonApiResource(type = "person")
@Entity
@Data
public class PersonEntity {

	@Id
	private UUID id;

	/**
	 * Name of subject, e.g. Hans Müller (some UTF8 testing here...)
	 */
	@JsonProperty
	private String name;

	private int year;

	@OneToMany(mappedBy = "movie")
	private List<RoleEntity> roles = new ArrayList<>();

	@Version
	private Integer version;

	@ElementCollection
	private Map<String, String> properties;

	@JsonAnyGetter
	public Map<String, String> getProperties() {
		return properties;
	}

	public void setProperties(Map<String, String> properties) {
		this.properties = properties;
	}

	@JsonAnySetter
	public void setProperties(String propertyName, String propertyValue) {
		if (properties == null) {
			properties = new HashMap<>();
		}
		this.properties.put(propertyName, propertyValue);
	}
}
