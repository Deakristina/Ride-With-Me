const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');

router.get('/', (req, res) => {
  if(req.session.currentUser){
    res.render('offerTripFile', {dashboard: true})
  } else {
    res.redirect('logout');
  }  
})

router.post('/', (req, res) => {
  const {from, to, departure, offered_seats, asking_price} = req.body;
  let trip = {
    from: from,
    to: to,
    departure: departure,
    offered_seats: offered_seats,
    asking_price: asking_price,
    driver: req.session.currentUser._id
  }
  Trip.create(trip, function (err, newTrip){
    res.render('postedTripFile', {offerTrip: true, dashboard: true})
  });
});


module.exports = router;