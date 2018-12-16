const express = require('express');
const router = express.Router();

//LOG OUT
router.get('/', (req, res) => {
  req.session.destroy((err) => {
    res.render("loginFile", {successLogOut: true, layout: "front"});
    })
});

module.exports = router;