const express = require('express');
const router = express.Router();

//load models
const User = require('../models/User');
const Profile = require('../models/Profile');

//bcrypt
const bcrypt = require("bcrypt");
const bcryptSalt = 5;

//signUp
router.get('/', (req, res) => {
  res.render('signup', {layout: "front"})
});

router.post('/', (req, res) => {
  const { username, password1, password2, email } = req.body;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPassword = bcrypt.hashSync(password1, salt);

  User.find(
    {
      username: username
    }
  ). then((result) => {
    let passwordsEqual = password1 === password2;
    let allFilled = username !== "" && password1 !== "" && password2 !== "" && email !== "";
    let userNotExists = result.length === 0;

    if (userNotExists && passwordsEqual && allFilled){
      let profile = {
        email: email
      }
      Profile.create(profile, function(err, newProfile){
        let user = {
          username: username,
          password: hashPassword,
          profile: newProfile.id
        }
        User.create(user, function(err, newUser){
          res.render("loginFile", {sucessRegistration: true, layout: "front"})
        })
      })
    } else {
      res.render("signup", {errorMessage: true, layout: "front" })
    }
  })
})

module.exports = router;