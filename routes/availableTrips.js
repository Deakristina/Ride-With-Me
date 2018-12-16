const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');;

router.get('/', (req, res) => {
  if(req.session.currentUser){
    res.render('availableTripsFile', {dashboard: true})
  } else {
    res.redirect('logout');
  }  
});

router.post('/', (req, res) => {
  const {from, to, departure} = req.body;
  let query = {}
  
  if (from !== '') {
    query.from = {'$regex': from, $options:'i'}
  }

  if (to !== '') {
    query.to = {'$regex': to, $options:'i'}
  }

  if (departure !== '') {
    query.departure = {'$regex': departure, $options:'i'}
  }
let helpers = {
    'subtract': function(arg1, arg2, options) {
      return arg1 - arg2;
    }
  }

  let date = new Date();
  let dateZero = `0${date.getDate()}`.slice(-2);
  let monthZero = `0${date.getMonth()+1}`.slice(-2);
  let dateString = `${date.getFullYear()}-${monthZero}-${dateZero}`;

  query.departure = {
      $gte: dateString,
  }

  Trip.find(query, function(err, tripsResult){
   
    if(tripsResult.length === 0){
      res.render('availableTripsFile', {noTrip: true, currentUser: true})
      console.log(query)
    } else {
      let availableTrip = [];
      tripsResult.forEach(trip =>{
      let availableSeats = trip.offered_seats - trip.occupied_seats;
      console.log(availableSeats)
        if(availableSeats > 0) {
          availableTrip.push(trip);
        }
     })
      res.render('availableTripsFile', {trips: availableTrip, currentUser: true, helpers: helpers})
    }
    
  })
  
})


module.exports = router;