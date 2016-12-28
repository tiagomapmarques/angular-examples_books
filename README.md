# Introduction

This is an example SPA using Angular2 and Typescript.

This app is based on the [Angular2-Seed](https://github.com/mgechev/angular-seed) project. Therefore all credit of the following features of my application are theirs:
- Ready to go, statically typed build system using Gulp for working with TypeScript.
- Production and development builds.
- Sample unit tests with Jasmine and Karma including code coverage via Istanbul.
- End-to-end tests with Protractor.
- Development server with live reload.
- TypeScript definition management using Types.
- Basic Service Worker, which implements "Cache then network strategy".

# Quick-start

- make sure you have node >=v6.5.0 and npm >=3.10.3
- git clone
- npm i
- npm start

That's it!

# Testing

After you've run the npm install command you can test this app in two ways.

## Unit-testing

- npm test

## E2E-testing

- npm run build.e2e
- npm start

And in another bash (after the app started):

- npm run e2e
- do **NOT** touch the browser that pops up... and dont't Alt-Tab either...

# Relevant structure changes

```
.
├── src                          <- source code of the application
│   └── client
│       ├── app
│       │   ├── book                             <- book show page
│       │   │   ├── book.component.html
│       │   │   ├── book.component.scss          <- I use sass
│       │   │   ├── book.component.ts
│       │   │   ├── book.module.ts
│       │   │   ├── book.routes.ts
│       │   │   └── index.ts
│       │   ├── home
│       │   │   ├── home.component.e2e-spec.ts
│       │   │   ├── home.component.html
│       │   │   ├── home.component.scss
│       │   │   ├── home.component.spec.ts
│       │   │   ├── home.component.ts
│       │   │   ├── home.module.ts
│       │   │   ├── home.routes.ts
│       │   │   └── index.ts
│       │   ├── shared
│       │   │   ├── ...
│       │   │   ├── models            <- interfaces for our data objects
│       │   │   ├── services          <- stateless services for fetching and processing data
│       │   │   ├── states            <- stateful classes to make objects available throughout the app
│       │   │   ├── ui                <- user interface components
│       │   │   ├── shared.module.ts
│       │   │   └── index.ts
│       │   └── ...
│       ├── assets
│       │   └── books.json
│       ├── css
│       │   └── main.scss
│       └── ...
└── ...
```

For a full map of the directory structure, either clone the project or go to [the original repo](https://github.com/mgechev/angular-seed).

# License

MIT
