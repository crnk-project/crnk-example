package io.crnk.example.service.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("proxy")
public class ProxyProperties {

	private String host;

	private int port;

	private String exclude;

	public String getHost() {
		return host;
	}

	public void setHost(String host) {
		this.host = host;
	}

	public int getPort() {
		return port;
	}

	public void setPort(int port) {
		this.port = port;
	}

	public String getExclude() {
		return exclude;
	}

	public void setExclude(String exclude) {
		this.exclude = exclude;
	}
}
