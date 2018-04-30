# crnk example application


[![Maven Central](https://img.shields.io/maven-central/v/io.crnk/crnk-core.svg)](http://mvnrepository.com/artifact/io.crnk/crnk-core)
[![Build Status](https://travis-ci.org/crnk-movie/crnk-example.svg?branch=master)](https://travis-ci.org/crnk-movie/crnk-example)
[![Gitter](https://img.shields.io/gitter/room/crkn-io/lobby.svg)](https://gitter.im/crnk-io/Lobby)
[![License](https://img.shields.io/badge/License-Apache%202.0-yellowgreen.svg)](https://github.com/crnk-movie/crnk-framework/blob/master/LICENSE.txt)

This is a Spring-based showcasing the use of [Crnk](https://github.com/crnk-movie/crnk-framework).
Further smaller example applications integrating into various frameworks can be found at 
[crnk-examples](https://github.com/crnk-movie/crnk-framework/tree/master/crnk-examples).

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


The frontend application will be available at
 
 	http://localhost:8080/
 	
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
    http://127.0.0.1:8080/api/scheduleDto
    http://127.0.0.1:8080/api/meta/resource
    http://127.0.0.1:8080/api/vote?fields=name // demos fields set & performance issues
    http://127.0.0.1:8080/api/secrets // demos error
 	
 	
To debug the frontend application go into `crnk-example-frontend` and use:

    yarn install
    yarn run start
    
Note that Gradle downloads a nodejs and yarn distribution into the 
`.gradle` directory you may make use of (see https://github.com/srs/gradle-node-plugin).


## Backend application

The `crnk-example-service` project is the backend application showcasing:

- integration of Crnk into Spring Boot
- exposing entities with crnk-jpa using `ExampleJpaModuleConfigurer`
- exception mapping with `CustomExceptionMapper`
- manually writing a resource repository with `VoteRepositoryImpl` (making use of Thread.sleep to simulate heavy work)
- using `@JsonApiRelationId` with `ScreeningRepositoryImpl` to 
  handle use cases where the related ID is easy to get, which in turn allows
  to omit having to implement relationship repositories.
- implementing a relationship repository with`HistoryRelationshipRepository`.
- introducing new relationships to existing resources
  without touching those resources with `HistoryFieldProvider`.  
- delivery of an Angular frontend application accessing the JSON API endpoint.
- `SecurityConfiguration` performs a OAuth setup with GitHub as provider.
  `LoginRepository` gives access to information about the logged-in user through http://localhost:8080/api/login.
  *Enable spring security in the `application.yaml`* to make use of the security features.
  *Security is disabled by default* to facilitate playing with the example app.
   The security setup is still work in progress. Currently the Angular app makes use of a session token
   and the Spring backend takes care of interacting with the GitHub OAuth provider. 
   In the future we may switch to a session-less, token-based setup (PRs welcomed).
- `CSRF` (resp. `XSRF` in Angular terminology) protection through `SecurityConfiguration`. 

The `TestDataLoader` will automatically setup some test data upon start.


## Frontend application

The `crnk-example-frontend` project is an Angular application showcasing the 
use of JSON API:

- https://github.com/ngrx/platform is used to do state management with Angular.
  For a tutorial see http://onehungrymind.com/build-better-angular-2-application-redux-ngrx/.
- https://github.com/abdulhaq-e/ngrx-json-api is used as Angular JSON API library.
- https://www.npmjs.com/package/@crnk/angular-ngrx is used to simplify binding
  of frontend components to JSON API. 
  see http://www.crnk.io/releases/stable/documentation/#_angular_development_with_ngrx.
- UI components and styling is taken from Angular Material. Some further PrimeNG components are 
  used (currently the table). You may use any UI component libary of your choice. Only the table
  binding of @crnk/angular-ngrx may need to be generalized (currently still PrimeNG-only to a small part). 
 
In more detail:

- `AppModule` initializes the application.
- `crnk-typescript-gen` is setup in Gradle to generate resource stubs into `src/resources`.
- `demo.scss` does some styling, work in progress. Google Material does a good job in general. PrimeNG not such much
  without the commercial themes that are not usable in OSS projects.
- `MovieModule` shows a typical CRUD pattern with a table (explorer) and editor. 
  - The explorer supports sorting, filtering and pagination.
  - The explorer allows to create an new resource with an editor.
  - The explorer allows to be refreshed with a button.
  - The editor can only be saved if all inputs are valid and there is a dirty value.
  - The editor allows to delete the record. 
  - The editor makes use of the generated resource stubs to gain type-safety.
  - The editor attempts to map JSON API error to the individual form fields. If that is not possible
    it will be shown on the top of the editor (such as for `OptimisticLockException` that concerns the entire changed resource).
    Leaving the name field empty will give an error. Or editing the resource in two windows concurrently will give conflict
    error for the later.
- `AppResourceResolve` is used during routing to load the necessary data for a screen. Here you can make use of advanced
  loading patterns like inclusions, sparse field sets, loading what has not already be loaded or isolating different
  parts of the application into different ngrx-json-api zones. The current example is still rather simple.
- `AppSnackBarService` shows the the user when a resource was successfully created or saved. Notifications
  are obtained from the store. `AppNotificationEffects` is responsible for putting those notifications into the store.
- `TranslateModule` and https://momentjs.com/ is used to do internationalization.
- `app/common/error` displays error screens and provides components for form validation. 
  - `ErrorRoutingService` triggers the navigation to the various error pages if a service call fails with certain
     error code. 
  - `ErrorComponent` displays a single error. Currently it has special handling of `OptimisticLockException`
     with status code `409`.   
- `LoadingService` displays a loading/busy screen if a resolver within navigation or a JSON API modification
   takes a lot of time. Have a look at the `vote` screen where the services have been artificially slowed down with 
   `Thread.sleep(...)`.
- `RouterEffects` provides various routing actions for ngrx.
- `AppNavigationEffects` handles the navigation between explorer and editor screen.
  - Upon successful creation of a new resource, it will navigate to the new, permanent url.
  - Upon successful deletion of a resource, it will navigate back to the explorer. 
- use of `https://github.com/serhiisol/ngx-auth` to handle authentication with OAuth setup on backend.
- `AuthenticationService` performs a redirect to the GitHub login page in case of an unauthenticated REST call.
  In the future we may switch to token-based setup (see `SecurityConfiguration` above for more information).

More to come... 		


## Roadmap

There are plenty of possible improvements:

- UI polishing
- Testing setup for frontend.
- Refine the data model.
- Security Setup.
- Inline table editing for frontend.
- More complex table filtering.
- More complex editor with more widgets and nested resources.
- More complex logic within repositories, such as an approval flow.
- More complex data loading patterns in `AppResourceResolve`.
- ...

Feedback and PRs very welcomed!


## Links

* [Homepage](http://www.crnk.io)
* [Documentation](http://www.crnk.io/releases/stable/documentation/)
* [Source code](https://github.com/crnk-project/crnk-example/)
* [Issue tracker](https://github.com/crnk-project/crnk-example/issues)
* [Forum](https://gitter.im/crnk-io/Lobby)
* [Build](https://travis-ci.org/crnk-project/crnk-example/)
