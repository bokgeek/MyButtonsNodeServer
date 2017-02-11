var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var buttonSchema = new Schema({
    label: { type: String },
    description: { type: String },
    action: { type: String },
    type: { type: String },
    color: { type: String, enum: ['Blue', 'Red', 'Green', 'Orange'] },
    user: { type: String },
    component: { type: String }
});

module.exports = mongoose.model('Button', buttonSchema);
