var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var mapPathSchema =  new Schema({
  beganAt: { type: Date, default: Date.now },
  last: Date,
  coordinates: [{ lat: Number, lng: Number }],
  distance: { type: Number, default: 0 },
  steps: { type: Number, default: 0 }
});

module.exports = mongoose.model('MapPath', mapPathSchema);