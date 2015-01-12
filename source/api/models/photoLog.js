var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var photoLog =  new Schema({
  imagePath: String,
  dateCreated: { type: Date, default: Date.now },
  comments: String, 
  fingerprint: String
});

module.exports = mongoose.model('photo', photoLog);