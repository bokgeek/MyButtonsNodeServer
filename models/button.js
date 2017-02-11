var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var buttonSchema = new Schema({
 label: { type: String },
 action: { type: String },
 color: { type: String, enum: ['blue', 'red'] },
 user: { type: Number },
 component: { type: String }
});

module.exports = mongoose.model('Button', buttonSchema);
