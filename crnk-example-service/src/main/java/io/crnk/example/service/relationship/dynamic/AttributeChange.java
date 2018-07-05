package io.crnk.example.service.relationship.dynamic;

import java.time.LocalDateTime;
import java.util.UUID;

import io.crnk.core.resource.annotations.JsonApiId;
import io.crnk.core.resource.annotations.JsonApiResource;

/**
 * Represents the change of an attribute.
 */
@JsonApiResource(type = AttributeChange.RESOURCE_TYPE)
public class AttributeChange {

	public static final String RESOURCE_TYPE = "attributeChange";

	@JsonApiId
	private UUID id;

	private String attribute;

	private String newValue;

	private String oldValue;

	private LocalDateTime changeTime;

	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public LocalDateTime getChangeTime() {
		return changeTime;
	}

	public void setChangeTime(LocalDateTime changeTime) {
		this.changeTime = changeTime;
	}

	public String getAttribute() {
		return attribute;
	}

	public void setAttribute(String attribute) {
		this.attribute = attribute;
	}

	public String getNewValue() {
		return newValue;
	}

	public void setNewValue(String newValue) {
		this.newValue = newValue;
	}

	public String getOldValue() {
		return oldValue;
	}

	public void setOldValue(String oldValue) {
		this.oldValue = oldValue;
	}
}
