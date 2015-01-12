var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var glucoseLog =  new Schema({
  dateCreated: { type: Date, default: Date.now },
  glucoseLevel: String,
  timeSinceEating: String,
  comments: String
});

module.exports = mongoose.model('GlucoseLog', glucoseLog);