## Installing dependencies

Use `yarn` or `npm install` to install the projects' dependencies.

## Configuration

This project uses three different databases. We have to make a copy of `.env.example` to a file called `.env` and fill its variables.

## Sequelize's migration

Run `npx sequelize db:seed:all` or `yarn sequelize db:seed:all` to create tables of our database.

## Available Scripts

In the project directory, you can run:

### `yarn dev`

Runs the server in the development mode.<br />
By default, we are using the port **3335**.

The server is going to reload if we make edits.

### `yarn dev:debug`

Runs the server in the development mode with Debug active.

### `yarn build`

Builds the server for production to the `dist` folder.<br />
It correctly set Node in production and optimizes the build for the best performance.

It generates a file called server.js inside of the dist folder.

### `yarn start`

Runs the server in the production mode.<br />
By default, we are using the port **3335**.

**To this script runs correctly is needed to have a `dist/server.js` file.**

### `yarn queue`

Runs the queue server in the development mode.
