# MPFrontend

Project to review my frontend knowledge

# DEV   
## Client

To run the client side in a development environment, you need to clone this repo and run in the client directory

```
npm install
npm start
```

or

```
yarn install
yarn start
```

Client will start an app in localhost:3000 by default.
## Server

To run the server in a development environment, you need to clone this repo and run in the server directory

```
npm install
npm start
```

Server will startup on localhost:3001 by default.

# PRD   
## Client

To run the client side in a production environment, you need to clone this repo and run in the client directory

```
npm install
npm build
```

or

```
yarn install
yarn build
```

This will generate a 'build' directory. You may then use:

```
yarn global add serve
serve -s build
```
Client will start an app in localhost:5000 by default.
## Server

To run the server in a production environment, you need to clone this repo and run in the server directory

```
npm install
npm build
```
This will generate a 'build' directory. You may then use:

```
SET HTTP_PORT={desiredPort} && node build\index.js
```

Server will startup on localhost:{desiredPort}.
