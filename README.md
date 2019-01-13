# crnk example application


[![Maven Central](https://img.shields.io/maven-central/v/io.crnk/crnk-core.svg)](http://mvnrepository.com/artifact/io.crnk/crnk-core)
[![Build Status](https://travis-ci.org/crnk-project/crnk-example.svg?branch=master)](https://travis-ci.org/crnk-project/crnk-example)
[![Gitter](https://img.shields.io/gitter/room/crkn-io/lobby.svg)](https://gitter.im/crnk-io/Lobby)
[![License](https://img.shields.io/badge/License-Apache%202.0-yellowgreen.svg)](https://github.com/crnk-project/crnk-framework/blob/master/LICENSE.txt)

This is a Spring-based showcasing the use of [Crnk](https://github.com/crnk-project/crnk-framework).
Further smaller example applications integrating into various frameworks can be found at 
[crnk-examples](https://github.com/crnk-project/crnk-framework/tree/master/crnk-examples).

*WARNING: this example project is still in development and subject to various improvements, see roadmap*

## Requirements

Crnk requires Java 8 or later. 

## Licensing

Crnk is licensed under the Apache License, Version 2.0.
You can grab a copy of the license at http://www.apache.org/licenses/LICENSE-2.0.


## Building from Source

Crnk make use of Gradle for its build. To build the complete movie run

    gradlew clean build
    
Note as part of the build a local Node installation is downloaded to build the frontend parts (crnk-ui) of the movie.    


## Running the application

In order to run this example do:

	gradlew run

or

    docker run --name=crnk -p 8080:8080 crnk/example

The JSON API endpoint will be available at:
 	
 	http://localhost:8080/api/
 	
Some further URLs to play around that show the power of Crnk:

    http://127.0.0.1:8080/api/movie
    http://127.0.0.1:8080/api/movie/44cda6d4-1118-3600-9cab-da760bfd678c
    http://127.0.0.1:8080/api/movie/44cda6d4-1118-3600-9cab-da760bfd678c
    http://127.0.0.1:8080/api/movie/44cda6d4-1118-3600-9cab-da760bfd678c/project
    http://127.0.0.1:8080/api/movie/44cda6d4-1118-3600-9cab-da760bfd678c/relationships/project
    http://127.0.0.1:8080/api/movie?sort=-name
    http://127.0.0.1:8080/api/movie?sort=-id,name
    http://127.0.0.1:8080/api/movie?sort=id&page[offset]=0&page[limit]=2
    http://127.0.0.1:8080/api/movie?filter[name]=Iron Man
    http://127.0.0.1:8080/api/movie?filter[name][EQ]=Iron Man
    http://127.0.0.1:8080/api/movie?filter[name][LIKE]=Iron
    http://127.0.0.1:8080/api/schedule
    http://127.0.0.1:8080/api/meta/resource
    http://127.0.0.1:8080/api/vote?fields=name // demos fields set & performance issues
    http://127.0.0.1:8080/api/secrets // demos error
 	

The `crnk-example-service` project showcases:

- Integration of Crnk into Spring Boot
- Exposing entities with crnk-jpa using `MovieRepository`, `PersonRepository`, etc. extending `JpaEntityRepositoryBase`.
  Behind the scenes the `QuerySpec` is translated to an efficient JPA Criteria query.
- A simple in-memory repository with`ScreeningRepository` that keeps all resources in a map.
- A manually written repository with `VoteRepository`. It makes use of Thread.sleep to simulate heavy work.
- A custom exception is introduced with `CustomExceptionMapper` that is mapped to a JSON API error and HTTP status code.
- using `@JsonApiRelationId` with `ScreeningRepository` to
  handle use cases where the related ID is easy to get, which in turn allows
  to omit having to implement relationship repositories.
- implementing a relationship repository with`AttributeChangeRelationshipRepository`.
- introducing new relationships to existing resources
  without touching those resources with `AttributeChangeFieldProvider`.  
- delivery of an Angular frontend application accessing the JSON API endpoint.
- `SecurityConfiguration` performs a OAuth setup with GitHub as provider.
  `LoginRepository` gives access to information about the logged-in user through http://localhost:8080/api/login.
  *Enable spring security in the `application.yaml`* to make use of the security features.
  *Security is disabled by default* to facilitate playing with the example app.
   The security setup is still work in progress. Currently the Angular app makes use of a session token
   and the Spring backend takes care of interacting with the GitHub OAuth provider. 
   In the future we may switch to a session-less, token-based setup (PRs welcomed).
- `CSRF` (resp. `XSRF` in Angular terminology) protection through `SecurityConfiguration`. 
- `ExampleSecurityConfigurer` to setup role-based access control.
- `ExampleDecoratorFactory` to intercept and modify requests to repositories.

The `TestDataLoader` will automatically setup some test data upon start.

Note that the project is structured based on the the use Crnk features like
JPA or decoration. For real-world application we do not recommend that, but rather
structure the application based on business value.

Feedback and PRs very welcomed!


## Links

* [Homepage](http://www.crnk.io)
* [Documentation](http://www.crnk.io/releases/stable/documentation/)
* [Source code](https://github.com/crnk-project/crnk-example/)
* [Issue tracker](https://github.com/crnk-project/crnk-example/issues)
* [Forum](https://gitter.im/crnk-io/Lobby)
* [Build](https://travis-ci.org/crnk-project/crnk-example/)
