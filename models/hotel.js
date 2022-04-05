const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hotelSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  roomType:{
    type:String,
    required: true
  },
  comment:{
    type:String,
    required: true
  },
  dinner:{
    type:Boolean,
    required: true
  },
  paymentMethod:{
    type:String,
    required: true
  }
});



module.exports = mongoose.model('Hotel', hotelSchema);
