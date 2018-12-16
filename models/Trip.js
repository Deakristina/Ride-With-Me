const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TripSchema = new Schema({
  from: String,
  to: String,
  departure: String,
  offered_seats: String,
  occupied_seats: {type: Number, default: 0},
  asking_price: String,
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  passengers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

const Trip = mongoose.model('Trip', TripSchema);
module.exports = Trip;
