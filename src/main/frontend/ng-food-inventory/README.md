# NgFoodInventory

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Docker

To run from docker hub image 

`docker run --name food-inventory -d -p 8080:80 dhensley/food-inventory`

To build and run the docker image locally

```
npm run build
npm run docker-build
npm run docker-run
```

The application will be available at `http://localhost:8095`

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
