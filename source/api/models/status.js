var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var statusLog =  new Schema({
  status: String, 
  expireAt: {
    type: Date,
    validate: [ function(v) {
      return (v - new Date()) <= 60000;
    }, 'Cannot expire more than 60 seconds in the future.' ],
    default: function() {
      return new Date(new Date().valueOf() + 60000);
    }
  }
});

module.exports = mongoose.model('status', statusLog);