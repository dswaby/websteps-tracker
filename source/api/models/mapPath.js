var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var mapPathSchema =  new Schema({
  beganAt: { type: Date, default: Date.now },
  endedAt: Date,
  coordinates: [{ lat: Number, lng: Number }]
});

module.exports = mongoose.model('MapPath', mapPathSchema);