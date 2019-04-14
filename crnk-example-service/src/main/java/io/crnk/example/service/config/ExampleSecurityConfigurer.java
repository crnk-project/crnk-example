package io.crnk.example.service.config;

import io.crnk.security.ResourcePermission;
import io.crnk.security.SecurityConfig;
import io.crnk.spring.setup.boot.security.SecurityModuleConfigurer;
import org.springframework.stereotype.Component;

/**
 * Secures resources based on role-based access control. For information have a look at the Security module chapter.
 */
@Component
public class ExampleSecurityConfigurer implements SecurityModuleConfigurer {

	@Override
	public void configure(SecurityConfig.Builder config) {

		// no authorizations yet, just authentication
		// see link how to setup a full authorization server, PRs welcomed
		config.permitAll(ResourcePermission.ALL);

		// use if role management is setup
		// config.permitAll(MovieEntity.class, ResourcePermission.ALL);
		// config.permitRole("guest", ScheduleDto.class, ResourcePermission.GET);
		// config.permitRole("admin", ScheduleDto.class, ResourcePermission.DELETE);
	}
}
