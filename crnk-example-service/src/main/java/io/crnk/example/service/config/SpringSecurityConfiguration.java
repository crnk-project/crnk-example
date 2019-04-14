package io.crnk.example.service.config;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import io.crnk.example.service.ExampleProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.autoconfigure.security.oauth2.resource.ResourceServerProperties;
import org.springframework.boot.autoconfigure.security.oauth2.resource.UserInfoTokenServices;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.NestedConfigurationProperty;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2ClientContext;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;
import org.springframework.security.oauth2.client.filter.OAuth2ClientAuthenticationProcessingFilter;
import org.springframework.security.oauth2.client.filter.OAuth2ClientContextFilter;
import org.springframework.security.oauth2.client.token.grant.code.AuthorizationCodeResourceDetails;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableOAuth2Client;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.filter.CompositeFilter;

/**
 * Spring-related security configuration. By default no security is used. But OAuth can be enabled if desired.
 *
 * <ul>
 * <li>https://spring.io/guides/tutorials/spring-boot-oauth2/</li>
 * <li>http://www.baeldung.com/rest-api-spring-oauth2-angularjs</li>
 * <li>https://spring.io/guides/gs/securing-web/</li>
 * <li>https://github.com/spring-projects/spring-security/tree/master/samples/boot/oauth2login</li>
 * <li>https://docs.spring.io/spring-boot/docs/current-SNAPSHOT/reference/htmlsingle/#boot-features-security</li>
 * </ul>
 */
@Configuration
@EnableGlobalMethodSecurity(securedEnabled = true, jsr250Enabled = true)
@EnableWebSecurity
@EnableOAuth2Client
public class SpringSecurityConfiguration extends WebSecurityConfigurerAdapter {


	@Autowired
	private ExampleProperties properties;

	@Autowired
	private OAuth2ClientContext oauth2ClientContext;

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		// consider moving to stateless and handle token on Angular side
		if (properties.isSecurityEnabled()) {
			// @formatter:off
			http
				.antMatcher("/**").authorizeRequests()
					.antMatchers("/", "/favicon.ico",
							"/assets/**",
							"/login**", "/styles**", "/inline**", "/polyfills**",
							"/scripts***", "/main**" ).permitAll()
					.anyRequest().authenticated()

				.and().logout().logoutSuccessUrl("/").permitAll()
				.and().csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
				.and().exceptionHandling().authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
				// .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				.and().addFilterBefore(ssoFilter(), BasicAuthenticationFilter.class);
			// @formatter:on
		}
		else {
			http.authorizeRequests().antMatchers("/**").permitAll();
			http.csrf().disable();
		}
	}

	@Bean
	@ConditionalOnProperty(prefix = "example.security-enabled", name = "enabled", havingValue = "true", matchIfMissing = true)
	public FilterRegistrationBean oauth2ClientFilterRegistration(OAuth2ClientContextFilter filter) {
		FilterRegistrationBean registration = new FilterRegistrationBean();
		registration.setFilter(filter);
		registration.setOrder(-100);
		return registration;
	}

	@Bean
	@ConfigurationProperties("github")
	public ClientResources github() {
		return new ClientResources();
	}

	private CompositeFilter ssoFilter() {
		CompositeFilter filter = new CompositeFilter();
		List<OAuth2ClientAuthenticationProcessingFilter> filters = new ArrayList<>();
		filters.add(ssoFilter(github(), "/login/github"));
		filter.setFilters(filters);
		return filter;
	}

	private OAuth2ClientAuthenticationProcessingFilter ssoFilter(ClientResources client, String path) {
		OAuth2RestTemplate oAuth2RestTemplate = new OAuth2RestTemplate(client.getClient(), oauth2ClientContext);

		UserInfoTokenServices tokenServices = new UserInfoTokenServices(client.getResource().getUserInfoUri(),
				client.getClient().getClientId());
		tokenServices.setRestTemplate(oAuth2RestTemplate);

		OAuth2ClientAuthenticationProcessingFilter oAuth2ClientAuthenticationFilter =
				new OAuth2ClientAuthenticationProcessingFilter(path);
		oAuth2ClientAuthenticationFilter.setRestTemplate(oAuth2RestTemplate);
		oAuth2ClientAuthenticationFilter.setTokenServices(tokenServices);
		oAuth2ClientAuthenticationFilter.setAuthenticationSuccessHandler(new SimpleUrlAuthenticationSuccessHandler() {
			@Override
			public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
					Authentication authentication) throws IOException, ServletException {
				// TODO switch to tokens or find a way to return to last page on client
				this.setDefaultTargetUrl("/");
				super.onAuthenticationSuccess(request, response, authentication);
			}
		});

		return oAuth2ClientAuthenticationFilter;
	}

	static class ClientResources {

		@NestedConfigurationProperty
		private AuthorizationCodeResourceDetails client = new AuthorizationCodeResourceDetails();

		@NestedConfigurationProperty
		private ResourceServerProperties resource = new ResourceServerProperties();

		public AuthorizationCodeResourceDetails getClient() {
			return client;
		}

		public ResourceServerProperties getResource() {
			return resource;
		}
	}
}
