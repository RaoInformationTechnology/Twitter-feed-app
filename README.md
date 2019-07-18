## Table Of Contents

- [About-this-project](#About-this-project)
    - [what is twitter-feed-app?](#what-is-twitter-feed-app?)
-   [Directory-Structure](#Directory-Structure)
-    [Getting-Started](#Getting-Started)
-    [Version-Control](#Version-Control)
-    [Running-The-Project](#Running-The-Project)
-    [Dependancies](#Dependancies)

## About This Project

### What is twitter-feed-app and how to use?

    * Twitter-feed-app is a social-media application

    * Twiiter-feed-app is in user signin with twitter and display popular tweets,display popular trends,display search-tweets,add hashtag,delete hashtag,update hashtag,search hashtag.

## Directory Structure

```
+-- /app [Node.js backend using express,Mongoose]
  +-- /config
    +-- [config files to intialize this API,e.g environment variable,db config or express router]
  +-- /controller
    +-- [Express controllers for the REST API]
  +-- /model
    +-- [Mongoose model]
  +-- /import
    +-- [Database contents that are to be imported into the database using an import script ]
  +-- /service
    +-- [Diffrent general-purpose services/utils that can be used in controllers or other parts of the API]
  +-- /validation
    +-- [validation using joi]
  +-- /server.js [The main enrty point where the app is started/intialized]

```

## Getting started

  1. Install a git client.

  2. Install an IDE(like visual studio code),visual studio is recommended,beacuse it has great       Commandline integration and javascript building/debugging features.

  3. Install Nodejs 8.10.0 

  4. Install mongodb 3.6.3

  5. Add NODE_PATH TO environment variables with values /node_modules.

  6. Enter the project folder and run the following command to get all right files in the right place
     `npm install`

  7. Start Mongodb and Node js via commandline in visual studio code.

  8. Open the project in visual studio code.

  9. The apllication can be accessed locally at http://localhost:3000.

## Version control

* we use git for version control

## Running the project

1. Navigate to your local project root directory in the command line of your choice.

2. Start the mongodb server.

3. Run node server.js or u can use nodemon if u have installed it.

4. Open u r browser and go to http://192.168.1.53:3000 or http://localhost:3000 and u should see the twitter-feed-app run locally

## Dependancies

* Open package.json to see all development and production dependencies or run npm ls in the project     root directory for all installed dependencies


## What is Node-Js?

* Node.js is an open source server environment.
* Node.js is free.
* Node.js runs on various platforms (Windows, Linux, Unix, Mac OS X, etc.).
* Node.js uses JavaScript on the server.

## Node-Js version

```json
{
 "version": "8.10.0"
}
```

## What Can Node-js do?

* Node.js can generate dynamic page content.
* Node.js can create, open, read, write, delete, and close files on the server.
* Node.js can collect form data.
* Node.js can add, delete, modify data in your database.
  
### `node server.js`

* Runs the app this sever `node server.js`


## What is express?

* Express provides a minimal interface to build our applications. It provides us the tools that are     required to build our app. It is flexible as there are numerous modules available on npm, which can   be directly plugged into Express.

## Express Framework version

```json
{
    "express": "^4.16.4"
}
```

## What is Body-parser?

* body-parser extract the entire body portion of an incoming request stream and exposes it on           req.body . The middleware was a part of Express.js earlier but now you have to install it             separately. This body-parser module parses the JSON, buffer, string and URL encoded data submitted    using HTTP POST request.

## Body-Parser version

```json
{
     "body-parser": "^1.18.3"
}
```

## What is cors?

* CORS is a node.js package for providing a Connect/Express middleware that can be used to enable       CORS with various options.

## Cors version Use

```json
{
     "cors": "^2.8.5"
}
```

## What is Mongoose and Mongodb?

* MongoDB is an open-source, document database designed for ease of development and scaling. This       database is also used to store data.

* Mongoose is a client API for node.js which makes it easy to access our database from our Express      application.

## Mongoose version Use

```json
{
   "mongoose": "^5.4.5",
   "mongod": "^3.6.3"
}
```

## What is passport?

* Passport is authentication middleware for Node.js. Extremely flexible and modular, Passport can be    unobtrusively dropped in to any Express-based web application. A comprehensive set of strategies      support authentication using a username and password, Facebook, Twitter, and more.

## Passport version Use

```json
{
    "passport": "^0.4.0"
}
```

## What is joi?

* joi is use for validation.

## Joi version Use

```json
{
  "joi": "^14.3.1"
}
```



