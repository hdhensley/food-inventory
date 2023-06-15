# Build the angular frontend
FROM node:16-alpine as frontend-build
WORKDIR /usr/frontend
COPY src/main/frontend/ng-food-inventory/ .
RUN npm install -g @angular/cli@16
RUN npm install
RUN npm run build

#Build the application
FROM gradle:7.6.1-jdk17-alpine AS build
WORKDIR /usr/app/
COPY . .
WORKDIR /usr/app/src/main/static
COPY --from=frontend-build /usr/frontend/dist/ .
WORKDIR /usr/app
RUN gradle clean build
RUN ls
RUN ls build
RUN ls build/libs

#Set up to run the application
FROM openjdk:17-alpine

WORKDIR /usr/run
COPY --from=build /usr/app/build/libs/*.jar ./app.jar

RUN ls

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
