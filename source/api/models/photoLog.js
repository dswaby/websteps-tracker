var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var photoLog =  new Schema({
  imagePath: String,
  dateCreated: String,
  comments: String
});


module.exports = mongoose.model('PhotoLog', photoLog);