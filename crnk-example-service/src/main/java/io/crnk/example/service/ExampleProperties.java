package io.crnk.example.service;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("example")
public class ExampleProperties {

	private boolean securityEnabled;

	public boolean isSecurityEnabled() {
		return securityEnabled;
	}

	public void setSecurityEnabled(boolean securityEnabled) {
		this.securityEnabled = securityEnabled;
	}
}
