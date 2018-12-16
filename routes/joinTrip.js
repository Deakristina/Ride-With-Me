const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');

router.get('/', (req, res) => {
  let tripId = req.query.tripId;
  let helpers = {
    'subtract': function(arg1, arg2, options) {
      return arg1 - arg2;
    }
  }

  if(req.session.currentUser){
    Trip.findOne({_id: tripId}, (err, tripResult) => {
      res.render('joinTripFile', {trip: tripResult, currentUser: true, helpers: helpers});
    })
  } else {
    res.redirect('logout');
  }
  
  
})

router.post('/', (req, res) => {
  let tripId = req.query.tripId;
  let userId = req.session.currentUser._id;
  let seatOccupation = req.body.seats;

  Trip.findOneAndUpdate({_id: tripId}, {$push: {passengers : userId}, $inc: {occupied_seats: seatOccupation}}, (err, updatedTrip) => {
    res.render('postedTripFile', {searchTrip: true, currentUser: true});
  })
})

module.exports = router;