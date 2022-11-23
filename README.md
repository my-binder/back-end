# MyBinder Back-End

This repository is the back-end of the MyBinder project.

WIP

## How to run

First, clone the repository.

```
git clone git@github.com:my-binder/back-end.git
```

Then, install the dependencies.

```
npm install
```

### Making your development environment

You need to create a `.env.development` file with your configs. We're using PostgreSQL, so you need that installed as well. Make the variables as shown in the `.env.example` file. After that, setup the database by running:

```
npm run dev:db:migrate
```

Finally, to run the server, run:

```
npm run dev
```

### Making your tests environment

You need to create a `.env.test` file in the same way you made the development one. Just follow the `.env.example` file but give a different name to the database, or else you will be emptying the development database each time you run tests. After that, setup the database by running:

```
npm run test:db:migrate
```

Use the following command to run the tests:

```
npm run test:integration
npm run test:unit
```

If you want to run a test environment server to do end-to-end tests on the front end, run:

```
npm run test
```

## Contributing

[Rafael Bordoni](https://github.com/eldskald)

## License

Licensed under MIT.
