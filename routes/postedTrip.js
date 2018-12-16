const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  if(req.session.currentUser){
    res.render('postedTripFile', {currentUser: true})
  } else {
    res.redirect('logout');
  }  
})

module.exports = router;