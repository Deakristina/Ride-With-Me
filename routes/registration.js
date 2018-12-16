const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: './public/uploads/' });

let Profile = require('../models/Profile');

router.get('/', (req, res) => { 
  if(req.session.currentUser) {
    Profile.findOne({_id: req.session.currentUser.profile})
    .then(foundProfile => {
      let options = {
        currentUser: true,
        profile: foundProfile,
        welcome: req.query.w,
        hideUpload: !req.query.save,
        helpers: {
          'ifEquals': function(arg1, arg2, options) {
            return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
          }
        }
      }
      res.render("regForm", options)
    });
  } else {
    res.redirect('logout');
  }
});

router.post('/', upload.single('photo'), (req, res) => {
  const {firstname, lastname, email, phone, birthdate, gender, driving_license, car_type, car_color} = req.body;
  let query = {_id: req.session.currentUser.profile}
  let profileData = {
    firstname: firstname,
    lastname: lastname,
    email: email,
    phone: phone,
    birthdate: birthdate,
    gender: gender,
    driving_license: driving_license,
    car_type: car_type,
    car_color: car_color
  }
  if (req.file != undefined) {
    profileData.path = `/uploads/${req.file.filename}`;
    profileData.originalName = req.file.originalname;
  }

  Profile.findOneAndUpdate(query, profileData, (err, updatedProfile) => {
    if(req.body.addPicture === undefined){
      res.redirect('/proceed');
    } else {
      res.redirect('/registration?save=1')
    }
    
  })
})

module.exports = router;