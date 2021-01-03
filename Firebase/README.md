# Sales Goals App

> Application for managing sales goals with Angular v11 & Firebase

## Usage

### Install project dependencies

```bash
$ npm install # Install project dependencies
```

### Run development server

```bash
$ ng serve # Runs server on http://localhost:4200
```

### Build & compile application

```bash
$ ng build
```

## Environment setup

Make sure to set your firebase credentials in the `environment.ts` file

```javascript
export const environment = {
  production: false,
  firebase: {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: "",
  },
};
```

## Running tests for Angular app

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## App info

### Version

1.0.0
