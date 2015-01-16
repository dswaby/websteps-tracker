var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var statusLog =  new Schema({
  status: String, 
  latitude: String,
  longitude: String,
  lastSeen: { type: Date, default: Date.now }
});

module.exports = mongoose.model('status', statusLog);