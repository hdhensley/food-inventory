[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# food-inventory

Application for keeping track of quantity of food in various locations

The application is built on the following

- Spring Boot
- H2 (File Persisted)
- Angular
- Tailwind
- DaisyUI

## Docker

This application is available as a docker image [dhensley/food-inventory](https://hub.docker.com/repository/docker/dhensley/food-inventory).

To run the image :

`docker run --name food-inventory -d -v inventory-volume:/opt/db -p 8080:8080 dhensley/food-inventory:latest`

## Gradle

There are several gradle tasks for running the application. Please see build.gradle for more information

### Development

```
./gradlew dockerBuild
./gradlew dockerRun
./gradlew devFrontend
```
