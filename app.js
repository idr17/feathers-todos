var feathers = require('feathers'),
	rest = require('feathers-rest'),
		socketio = require('feathers-socketio'),
			bodyParser = require('body-parser'),
				app = feathers();

// stateles service
var todoService = {
	todos: [{
		text: 'Learn Feathers',
		complete: false
	}],
	find: function(params, callback) {
		callback(null, this.todos);
	},
	create: function(data, params, callback) {
		this.todos.push(data);
		callback(null, data);
	}
}

app.configure(rest());
app.configure(socketio());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/todos', todoService);

app.listen(3030);