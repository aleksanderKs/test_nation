const router = require('express').Router();
// const { createUser, loginUser } = require('../models/user');

const {saveFeedBack, getFeedBacks} = require('../models/feedback');



router.post('/save', saveFeedBack, function(req,res) {
  console.log(req.body);
  res.send({'reponse':'Done'});
  // res.redirect('/');
});




router.get('/get', getFeedBacks, function(req,res) {
  // console.log(req.body);
  // res.send({'reponse':'Done'});
    res.json(req["results"]);

  // res.redirect('/');
});









module.exports = router;
