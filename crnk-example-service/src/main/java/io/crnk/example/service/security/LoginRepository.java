package io.crnk.example.service.security;

import java.util.ArrayList;
import java.util.List;

import io.crnk.core.queryspec.QuerySpec;
import io.crnk.core.repository.ResourceRepositoryBase;
import io.crnk.core.resource.list.ResourceList;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

/**
 * Makes logged-in user available as JSON API resource.
 */
public class LoginRepository extends ResourceRepositoryBase<Login, String> {


	public LoginRepository() {
		super(Login.class);
	}

	@Override
	public ResourceList<Login> findAll(QuerySpec querySpec) {
		List<Login> logins = new ArrayList<>();
		SecurityContext context = SecurityContextHolder.getContext();
		if (context != null) {
			Authentication authentication = context.getAuthentication();

			Login me = new Login();
			me.setId("me");
			me.setUserName(authentication != null ? authentication.getName() : "anonymous");
			logins.add(me);
		}
		return querySpec.apply(logins);
	}
}
