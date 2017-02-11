var cool = require('cool-ascii-faces');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require("method-override");
var app = express();

// Connection to DB

/*
 * Mongoose by default sets the auto_reconnect option to true.
 * We recommend setting socket options at both the server and replica set level.
 * We recommend a 30 second connection timeout because it allows for
 * plenty of time in most operating environments.
 */
var options = {
    server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }
};

var mongodbUri = 'mongodb://tester:tester@ds149329.mlab.com:49329/mybuttons';
//var mongodbUri = 'mongodb://localhost/buttons';

mongoose.connect(mongodbUri, options);


var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));

conn.once('open', function () {
    // Wait for the database connection to establish, then start the app.
    console.log('Connected to Database');

    // Middlewares
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    app.get('/cool', function (request, response) {
        response.send(cool());
    });

    // Import Models and Controllers
    var models = require('./models/button')(app, mongoose);
    var ButtonCtrl = require('./controllers/button');

    var router = express.Router();

    // Index
    router.get('/', function (req, res) {
        res.send("MyButtons project");
    });

    app.use(router);

    // API routes
    var api = express.Router();

    api.route('/buttons')
        .get(ButtonCtrl.findAll)
        .post(ButtonCtrl.add)
        .delete(ButtonCtrl.deleteAll);

    api.route('/buttons/:id')
        .get(ButtonCtrl.findById)
        .put(ButtonCtrl.update)
        .delete(ButtonCtrl.delete);

    app.use('/api', api);

    // Start server
    app.listen(process.env.PORT || 3000, function () {
        console.log("Node server running on http://localhost:3000 || " + process.env.PORT);
    });
});



