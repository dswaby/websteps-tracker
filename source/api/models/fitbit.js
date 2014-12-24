var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var fitBitSchema =  new Schema({
  imagePath: String,
  dateCreated: Date
});


module.exports = mongoose.model('Fitbit', fitBitSchema);