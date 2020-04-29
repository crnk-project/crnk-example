package io.crnk.example.service;

import io.crnk.example.service.config.SpringSecurityConfiguration;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.web.bind.annotation.RestController;

@Configuration
@RestController
@EnableAutoConfiguration
@ComponentScan("io.crnk.example.service")
@Import({TestDataLoader.class, SpringSecurityConfiguration.class})
@EnableConfigurationProperties(ExampleProperties.class)
public class ExampleConfiguration {

}
