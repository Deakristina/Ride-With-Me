const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');

router.get('/', (req, res) => {
   let user = req.session.currentUser;
   if(user){
    Trip.find({driver: user._id}, function(err, tripsResult){
      res.render('historyTripFile', {trips: tripsResult, currentUser: true})
    })
  } else {
    res.redirect('logout');
  }  
});

module.exports = router;