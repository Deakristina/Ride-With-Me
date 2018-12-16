const express = require('express');
const router = express.Router();

//load models
const User = require('../models/User');
let Profile = require('../models/Profile');

const bcrypt = require("bcrypt");

router.get('/', (req, res) => {
  res.render('loginFile', {layout: "front"});
});

router.post('/', (req,res) => {
  const { username, password } = req.body;
  User.findOne(
    {
      username: username
    }
  ).then((user) => {
    if(!user){
      res.render('loginFile', {incorrectCombi: true, layout: "front"})
    } else if(bcrypt.compareSync(password, user.password)) {
      req.session.currentUser = user;
      Profile.findOne({_id: user.profile})
      .then(profile => {
        if (
          profile.firstname !== undefined && profile.lastname !== undefined 
          && profile.email !== undefined && profile.phone !== undefined && 
          profile.birthdate !== undefined && profile.gender !== undefined
        ){
          res.redirect("/proceed");
        } else {
          res.redirect("/registration?w=1");
        } 
      })
    } else {
      res.render('loginFile', {incorrectCombi: true, layout: "front"})
    }
  })
  .catch((err) => {
    console.log(err)
    throw err;
  }) 
});


module.exports = router;