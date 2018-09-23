# README #

## Introduction ##

Simple dashboard prototype created to provide example code for various modern frameworks/libraries and workflows.

## Overview ##

- Frontend Stack
    - [React 16+](https://reactjs.org/docs/getting-started.html "React Documentation")
    - [Styled Components](https://www.styled-components.com/docs "Styled Components Documentation")
    - [Axios](https://www.npmjs.com/package/axios "Axios NPM")
    - [D3 v5](https://github.com/d3/d3/blob/master/API.md "D3 Api Reference")
    - [Unstated](https://www.npmjs.com/package/unstated "Unstated NPM")
    - [AVA](https://github.com/avajs/ava "AVA documentation")
    - [Webpack 4](https://webpack.js.org/concepts/ "Webpack Documentation")
    - [Lodash](https://github.com/lodash/lodash/wiki/FP-Guide "Lodash Documentation")

- Backend Stack
    - [Node v8.11.3](https://nodejs.org/en/docs/ "Node Documentation")
    - [Express v4.x](https://expressjs.com/en/4x/api.html "Express Documentation")
    - [Knex.js](https://knexjs.org/ "Knex Documentation")
    - [Bookshelf.js](http://bookshelfjs.org/ "Bookshelf Documentation")

- Database
    - [PostgreSQL](https://www.postgresql.org/docs/10/static/index.html "PostgreSQL Documentation")

## Docker Cheatsheet ##

Remember to run docker-compose commands at the **root** of the project (in the same directory as docker-compose.yml).

- `docker-compose build <service>`

Builds the image using the location of the Dockerfile defined in docker-compose.yml. **Note:** If an image is already built this must be run to rebuild.

- `docker image prune`

Cleans up any lingering images used in the build process. Usually these will appear tagged as "<none>" when running `docker images`.

- `docker-compose up <service>`

Runs the specified service in a Docker container. Will build service if image not found.

- `docker exec -it <container name> /bin/bash`

Runs bash (or specified shell) on a running container.

## Getting Started ##

It is preferrable to have [Docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/ "Install Docker") and [Docker Compose](https://docs.docker.com/compose/install/ "Install Docker Compose") for development on this project.

### Environment Variables ###

Create a file named ".env". You will need to set several environment variables in order for the Docker containers to function properly. Each variable **must** be defined on its own line and use the following format:

`<Variable Name>=<Variable Value>`

e.g `NODE_ENV=development`

Assign values to the following environment variables:

```
NODE_ENV

WEBPACK_HOST
WEBPACK_PORT

HOST
PORT

POSTGRES_DB
POSTGRES_USER
POSTGRES_PASSWORD

```

### Building Service Images ###

Docker images are defined using a Dockerfile in each respective service's directory. For instance: /server/Dockerfile lists the Docker instructions for building the "server" service.

#### Server ####

You'll need to build the Docker image for the server. From the **root** of the project, run `docker-compose build server`. This may take a few minutes. After that's done, run `docker image prune` to clean up any intermediate images.

#### Client ####

Run `docker-compose build client`. This may take a few minutes. As above, run `ocker image prune` to clean up unnecessary artefacts.

Verify that your images were successfully built by runnning `docker images`, and looking for the server and client services.

### Running Services ###

#### Server ####

Run `docker-compose up server` to start the server and database services. This will run `npm start` as defined in /server/package.json. The output in your terminal will indicate that several tests are **failing**. Please see the *Migrations* section below for more information.

#### Client ####

Run `docker-compose up client` to start the client service. This will start a webpack-dev-server at the specified WEBPACK_PORT and WEBPACK_HOST above. All unit tests should be **passing**.

### Migrations ###

You'll need to run migrations in order to ensure a consistently defined schema. Make sure your node and database containers are running before proceeding.

Run `docker exec -it <name of node container> /bin/bash`. This will provide a terminal (bash) inside of your running container. Run `/app/node_modules/.bin/knex migrate:latest` in order to update the schema.

Restart your node container, you should see your tests passing now.

### Seeding ###

Enter your node container as above with `docker exec -it <name of node container> /bin/bash`. Run `/app/node/node_modules/.bin/knex seed:run` to seed the database with test data.
