const express = require('express');
const ensureLogin = require('connect-ensure-login');

const router = express.Router();

router.get('/secret', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.send('secret steeeef');
});

router.get('/kgb-files', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.send('Soviet Russia is under attack');
});


module.exports = router;
