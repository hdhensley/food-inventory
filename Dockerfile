# Build the angular frontend
FROM node:22-alpine as frontend-build
WORKDIR /usr/frontend
COPY src/main/frontend/ng-food-inventory/ .
RUN npm install -g @angular/cli@19
RUN npm install
RUN npm run build --aot
RUN ls

#Build the application
FROM gradle:8.13.0-jdk21-corretto AS build
WORKDIR /usr/app/
COPY . .
WORKDIR /usr/app/src/main/resources/static
RUN ls
COPY --from=frontend-build /usr/frontend/dist/* .
# npm run build --aot && cp -r dist/ng-food-inventory/* ../../resources/static/
RUN ls
WORKDIR /usr/app
RUN gradle build
RUN ls
RUN ls build
RUN ls build/libs

#Set up to run the application
FROM amazoncorretto:21-alpine3.20

WORKDIR /usr/run
COPY --from=build /usr/app/build/libs/*.jar ./app.jar

RUN ls

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
