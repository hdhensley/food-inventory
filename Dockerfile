FROM gradle:7-jdk8 AS build-env

FROM openjdk:8-alpine

COPY ./build/libs/*.jar /app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
