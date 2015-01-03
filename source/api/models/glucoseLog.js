var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var glucoseLog =  new Schema({
  dateCreated: String,
  glucoseLevel: Number,
  comments: String
});

module.exports = mongoose.model('GlucoseLog', glucoseLog);