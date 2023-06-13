FROM gradle:7.6.1-jdk17-alpine AS build
WORKDIR /usr/app/
COPY . .
RUN gradle build

FROM openjdk:17-alpine

ENV JAR_NAME=app.jar
ENV APP_HOME=/usr/app/
WORKDIR $APP_HOME
COPY --from=build $APP_HOME .

EXPOSE 8080
ENTRYPOINT exec java -jar $APP_HOME/build/libs/$JAR_NAME
