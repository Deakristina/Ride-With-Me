const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');

router.get('/', (req, res) => {
  let user = req.session.currentUser;

  if(user){
    let profileId = user.profile;
    Profile.findOne({_id: profileId}) 
      .then((profile) => {
        if(profile.driving_license === ""){
          res.render('proceedFile', {currentUser: true, partlyFilled: true})
        } else {
          res.render('proceedFile', {currentUser: true, allFilled: true})
        } 
      })
      .catch((err) =>{
        throw err
        });
  } else {
    res.redirect('logout');
  }  
});


module.exports = router;