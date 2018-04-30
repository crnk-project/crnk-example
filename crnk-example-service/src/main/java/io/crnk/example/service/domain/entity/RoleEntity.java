package io.crnk.example.service.domain.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
public class RoleEntity {

	@Id
	private Long id;

	@JsonProperty("role")
	private String name;

	@Size(max = 20, message = "Description may not exceed {max} characters.")
	private String description;

	@JsonIgnore
	private Long someId;

	@ManyToOne
	private MovieEntity movie;

	@ManyToOne
	private PersonEntity person;

	public RoleEntity() {
	}


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public MovieEntity getMovie() {
		return movie;
	}

	public void setMovie(MovieEntity movie) {
		this.movie = movie;
	}

	public Long getSomeId() {
		return someId;
	}

	public void setSomeId(Long someId) {
		this.someId = someId;
	}

	public PersonEntity getPerson() {
		return person;
	}

	public void setPerson(PersonEntity person) {
		this.person = person;
	}
}
