# crnk example application

[![Build Status](https://travis-ci.org/crnk-project/crnk-example.svg?branch=master)](https://travis-ci.org/crnk-project/crnk-example)
[![Gitter](https://img.shields.io/gitter/room/crkn-io/lobby.svg)](https://gitter.im/crnk-io/Lobby)
[![License](https://img.shields.io/badge/License-Apache%202.0-yellowgreen.svg)](https://github.com/crnk-project/crnk-framework/blob/master/LICENSE.txt)

This is a Spring-based showcasing the use of [Crnk](https://github.com/crnk-project/crnk-framework).
Further smaller example applications integrating into various frameworks can be found at
[crnk-integration-examples](https://github.com/crnk-project/crnk-framework/tree/master/crnk-integration-examples).

*WARNING: this example project is still in development and subject to various improvements, see roadmap*

## Requirements

Crnk requires Java 8 or later.

## Licensing

Crnk is licensed under the Apache License, Version 2.0.
You can grab a copy of the license at http://www.apache.org/licenses/LICENSE-2.0.


## Building from Source

Crnk make use of Gradle for its build. To build the project run

    gradlew build


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
    http://127.0.0.1:8080/api/facet?filter[resourceType]=movie // get movie facets


## IDE

Make sure to enable annotation processing support when using IntelliJ IDEA. Otherwise it will
not be able to find the generated sources from the Crnk annotation processor (type-safe Query objects).

## Build Setup

The project makes use of https://github.com/rmee/gradle-plugins/ for the build setup.

- if no JAVA_HOME is configured (recommended), a suitable JDK will be downloaded automatically
  by the `jdk-bootstrap` plugin.
- `src/main/helm` holds a Helm chart to deploy to Kubernetes.
- Deployment to Kubernetes is triggered by the `deploy` task. All the deployment is confined
  to Docker images and a project-specific home directory located in `build/home`. No installation
  of any tooling necessary thanks to the plugins in use. Further wrapper scripts like `./kubectl`
  allow to use this deployment setup from a shell (GitBash, Linux, etc.). For deployment
  `CRNK_GCLOUD_REGION`, `CRNK_GCLOUD_PROJECT`, `CRNK_GCLOUD_CLUSTER` environment variables must
  be set and credentials be available in `crnk-example-service/secrets/gcloud.key`.


## Pointers


The `crnk-example-service` project showcases:

- Use of Lombok to avoid getter/setter boiler-plate.
- Integration of Crnk into Spring Boot
- `io.crnk:crnk-format-plain-json` has been applied for slightly simplified version of JSON:API without
  `attributes`, `relationships`, `includes` section.
- A simple in-memory repository with`ScreeningRepository` that keeps all resources in a map.
- Exposing entities with crnk-jpa using `MovieRepository`, `PersonRepository`, etc. extending `JpaEntityRepositoryBase`.
  Behind the scenes the `QuerySpec` is translated to an efficient JPA Criteria query.
- A manually written repository with `VoteRepository`. It makes use of Thread.sleep to simulate heavy work.
- A custom exception is introduced with `CustomExceptionMapper` that is mapped to a JSON API error and HTTP status code.
- using `@JsonApiRelationId` with `ScreeningRepository` to
  handle use cases where the related ID is easy to get, which in turn allows
  to omit having to implement relationship repositories.
- implementing a relationship repository with`AttributeChangeRelationshipRepository`.
- implementing a multi-valued nested resource with `Secret` and its identifier `SecretId`.
- implementing a single-valued nested resource with `SecreeningStatus`. Shared the same ID as the screening itself
  and make use of `SerializeType.EAGER` to directly be shown with the screening (see
  http://127.0.0.1:8080/api/screening)
- introducing new relationships to existing resources
  without touching those resources with `AttributeChangeFieldProvider`.
- `PersonEntity` as dynamic resource by annotating a `Map`-based field with `@JsonAnyGetter` and `@JsonAnySetter`
- `SecurityConfiguration` performs a OAuth setup with GitHub as provider.
  `LoginRepository` gives access to information about the logged-in user through http://localhost:8080/api/user.
  *Enable spring security in the `application.yaml`* to make use of the security features.
  *Security is disabled by default* to facilitate playing with the example app.
   The security setup is still work in progress.
- `CSRF` (resp. `XSRF` in Angular terminology) protection through `SpringSecurityConfiguration`.
- `ExampleSecurityConfigurer` to setup role-based access control.
- `ScheduleDecoratorFactory` to intercept and modify requests to repositories.
- The documentation gets generated to `build/asciidoc` upon executing `gradlew build`. Have a look at the
  `build.gradle` file and the capturing based on `AsciidocCaptureModule` within the test cases.
- Support for facetted search by applying `crnk-data-facets`. `MovieEntity.year` as been marked as being facetted with `@Facet`.
  See `http://127.0.0.1:8080/api/facet?filter[resourceType]=movie`.
- `MovieRepository` provides an interface for the `MovieRepositoryImpl` which allows type-safe access
  to movie result lists in `CrnkClient`.
- `MovieRepository` makes use of `HasMoreResourcesMetaInformation` through a custom `MovieList` type. This
   triggers the use of a previous/next paging strategy, rather than always computing the total count
   in a second, potentially expensive query.

The `TestDataLoader` will automatically setup some test data upon start.

The project itself makes use of an number of third-party plugins to bootstrap a JDK, build Helm packages and
allow a Kubernetes installation to Google Cloud. For more information see https://github.com/rmee/gradle-plugins/.

Feedback and PRs very welcomed!


## Links

* [Homepage](http://www.crnk.io)
* [Documentation](http://www.crnk.io/releases/stable/documentation/)
* [Source code](https://github.com/crnk-project/crnk-example/)
* [Issue tracker](https://github.com/crnk-project/crnk-example/issues)
* [Forum](https://gitter.im/crnk-io/Lobby)
* [Build](https://travis-ci.org/crnk-project/crnk-example/)
