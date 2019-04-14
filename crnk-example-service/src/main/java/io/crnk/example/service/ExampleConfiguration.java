package io.crnk.example.service;

import io.crnk.core.engine.registry.RegistryEntry;
import io.crnk.core.engine.registry.ResourceRegistry;
import io.crnk.example.service.config.SpringSecurityConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@Configuration
@RestController
@EnableAutoConfiguration
@ComponentScan("io.crnk.example.service")
@Import({TestDataLoader.class, SpringSecurityConfiguration.class})
@EnableConfigurationProperties(ExampleProperties.class)
public class ExampleConfiguration {

    @Autowired
    private ResourceRegistry resourceRegistry;

    /**
     * An example MVC service working next to JSON API
     */
    @RequestMapping("/resourcesInfo")
    public Map<?, ?> getResources() {
        Map<String, String> result = new HashMap<>();
        // Add all resources (i.e. MovieEntity and RoleEntity)
        for (RegistryEntry entry : resourceRegistry.getEntries()) {
            result.put(entry.getResourceInformation().getResourceType(),
                    resourceRegistry.getResourceUrl(entry.getResourceInformation()));
        }
        return result;
    }
}
