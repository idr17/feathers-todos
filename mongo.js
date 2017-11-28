var feathers = require('feathers');
var rest = require('feathers-rest');
var socketio = require('feathers-socketio');
var service = require('feathers-mongodb');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var ejs = require('ejs');

var app = feathers()
	.configure(rest())
	.configure(socketio())
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({ extended: true }))
	.set('view engine', 'ejs');

// On MongoDB use the `local` database
// and the `todos` collection

//To run mongo db in application
// follow this instruction:
// https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/#run-mongodb-community-edition
//1. installed mongo db on pc
//2. run mongo db machine
//3. npm install mongodb feathers-mongodb
// mongodb is mongodb service
// feathers-mongodb is feathers service for mongodb
// feathers-mongodb already include http request like get, post, put, delete etc. so unnedeed to define manualy like code in app.js

const promise = new Promise(resolve => {
	MongoClient.connect('mongodb://localhost:27017/local').then(db => {
		app.use('/todos', service({
			Model: db.collection('todos'),
			paginate: {
				default: 10, max: 20
			}
		}));

		app.use('/', function(req, res) {
			app.service('todos').find({}, function(error, todos) {
				res.render('index', {todos: todos.data})
			});
		});

		var server = app.listen(3030);
		server.on('listening', () => {
			console.log('Feathers todos mongodb running on localhost:3030');
			resolve(server);
		});
	});
});

module.exports = promise;
