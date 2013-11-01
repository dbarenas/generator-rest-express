# Express + MongoDB REST API Generator [![Build Status](https://secure.travis-ci.org/brianviveiros/generator-express-rest.png?branch=master)](https://travis-ci.org/brianviveiros/generator-express-rest)

A [Yeoman](http://yeoman.io) generator for building a REST API in minutes using Express + MongoDB.

The main generator will scaffold a project that is identical to the express command line generator as of express 3.4.2.

The express-rest generator adds the following:
1 A resource generator for generating the routes and queries required to offer basic CRUD operations on the resource.
2 Scaffolding for a connection to a MongoDB instance using the Mongoose driver.
3 A basic logger using winston

## Resource Generator
The resource generator will generate the routes and queries required to offer basic CRUD operations on the resource.

All CRUD APIs follow the convention:
<table>
  <tr><th>Action</th><th>HTTP Verb</th><th>path</th></tr>
  <tr><td>Create</td><td>POST</td><td>/resource</td></tr>
  <tr><td>Read</td><td>GET</td><td>/resource/:id</td></tr>
  <tr><td>Update</td><td>PUT</td><td>/resource/:id</td></tr>
  <tr><td>Delete</td><td>DELETE</td><td>/resource/:id</td></tr>
  <tr><td>Get the full list</td><td>GET</td><td>/resource</td></tr>
</table>

If you wish to customize the code that has been generated, here's where to look:
* The routes are defined in ./routes/index.js
* The Schema is defined in lib/db.js
* The quries are defined in resource/<resource>.js

## MongoDB Connection
Mongoose is currently being used as the MongoDB driver. The file **lib/db.js** contains the connection and schema definition.

## Logging
A basic logger is created, the details are in the file **lib/log.js**.  By default it creates a log file named logs/development.log.  If the environment variable NODE_ENV is set to 'production' then the file will be named logs/production.log.

## Dependencies
1. Make sure you have [yo](https://github.com/yeoman/yo) installed on the latest version.
	```bash
	$ npm install -g yo
	```
1. Ensure that [MongoDB](http://www.mongodb.org/) is installed and running.

## Getting started
1. Install the generator

	```bash
	$ npm install -g generator-express-rest
	```
	
1. Create a project directory and run the generator

	```bash
	$ mkdir myApp
	$ yo express-rest
	```
	
1. Reply to the prompts asking you for your MongoDB connection details

	```bash
	$ [?] IP address where MongoDB is running? (127.0.0.1)
	$ [?] Database name? (myApp)
	```
	
1. Generate your first resource API

	```bash
	$ yo express-rest:resource user
	```
	
1. Start your node server

	```bash
	$ node app.js
	```
	
1. Create a few resources using curl

	```bash
	$ curl -d "firstname=Brian" http://localhost:3000/users
	$ curl -d "firstname=Jerry" http://localhost:3000/users
	```
	
1. Retreive the list resources using curl

	```bash
	$ curl http://localhost:3000/users
	```

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
