const express = require('express');
const router  = express.Router();

// GET home page.
router.get('/', (req, res, next) => {
  res.render('index', {
    // Coming from a successful regsitration, successMessage will have a value = 'You have been successfully registered'
    successMessage: req.flash('success'),
    userInfo: req.user //Comes from the findOne that passport does to find a user.
  });
});

module.exports = router;
