var feathers = require('feathers');
var rest = require('feathers-rest');
var socketio = require('feathers-socketio');
var service = require('feathers-mongodb');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var ejs = require('ejs');
var path = require('path');

var app = feathers()
	.configure(rest())
	.configure(socketio())
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({ extended: true }))
	.use(feathers.static(path.join(__dirname, "asset", "js")))
	.set('view engine', 'ejs');

const promise = new Promise(resolve => {
	MongoClient.connect('mongodb://localhost:27017/local').then(db => {
		app.use('/todos', service({
			Model: db.collection('todos')
		}));

		app.use('/', function(req, res) {
			app.service('todos').find({}, function(error, todos) {
				res.render('index', {todos: todos})
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
