var mongoose = require('mongoose');
var Button = mongoose.model('Button');

//GET - Return all buttons
exports.findAll = function (req, res) {
    Button.find(function (err, buttons) {
        if (err) res.send(500, err.message);
        console.log('GET /buttons');
        res.status(200).jsonp(buttons);
    });
};

//GET - Return a button with specified ID
exports.findById = function (req, res) {
    Button.findById(req.params.id, function (err, button) {
        if (err) return res.send(500, err.message);
        console.log('GET /buttons/' + req.params.id);
        res.status(200).jsonp(button);
    });
};

//POST - Insert a new button
exports.add = function (req, res) {
    console.log('POST');
    console.log(req.body);
    var button = new Button({
        label: req.body.label,
        description: req.body.description,
        action: req.body.action,
        type: req.body.type,
        color: req.body.color,
        user: req.body.user,
        component: req.body.component
    });

    button.save(function (err, button) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(button);
    });
};

//PUT - Update a button already exists
exports.update = function (req, res) {
    Button.findById(req.params.id, function (err, button) {
        button.label = req.body.label;
        button.description = req.body.description;
        button.action = req.body.action;
        button.type = req.body.type;
        button.color = req.body.color;
        button.user = req.body.user;
        button.component = req.body.component;

        button.save(function (err) {
            if (err) return res.send(500, err.message);
            res.status(200).jsonp(button);
        });
    });
};

//DELETE - Delete a button with specified ID
exports.delete = function (req, res) {
    Button.findById(req.params.id, function (err, button) {
        button.remove(function (err) {
            if (err) return res.send(500, err.message);
            res.json({ message: 'Successfully deleted' });
        });
    });
};

//DELETEALL - Delete ll registers
exports.deleteAll = function (req, res) {

    Button.remove(function (err) {
        if (err) return res.send(500, err.message);
        res.json({ message: 'Successfully deleted all' });
    });
};
