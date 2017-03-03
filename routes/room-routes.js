const express = require('express');
const ensure = require('connect-ensure-login');
const multer = require('multer'); // Helps manage the receiving of the file and putting it into the right place.
const Room = require('../models/room-model.js');

const router  = express.Router();
const uploads = multer({ dest: __dirname + '/../public/uploads/'});
// __dirname Means: forget from where you are running the app, I want you to look inside this folder followe by any directions I give to you.

router.get('/rooms/new', ensure.ensureLoggedIn(), (req, res, next) => {
  res.render('rooms/new.ejs', {
    message: req.flash('success')
  });
});

router.post('/rooms',
  ensure.ensureLoggedIn(),
  //uploads is coming from the require on top!
  uploads.single('picture'), // 'picture' is the name we gave the picture in the input field in the form.
  (req, res, next) => {
  const filename = req.file.filename;

  const newRoom = new Room ({
    name:  req.body.name,
    description:  req.body.description,
    picture: `/uploads/${filename}`,
    owner: req.user._id   // <-- we add the user ID //!! You also need a field in the Schema to accept.
    //  Where is user._id defined?

    // IMPORTANT!! explenation about sessions _id's and the _id in the DB:
    // req.user comes from the session being established. The _id is stored in the session (and is technicallly not the same _id that is in the database, altough it has the same _id).
    // Furthermore, it references towards the _id that is saved in the database and then retrieves the information associated with the _id.
    // Moreover, this is also called deserializing. On the other hand serializing is taking the _id from the database and giving it to different sessions.

    // Flow of cookie to session to db:
    // Cookie is stored in PC and delegates/ references towards a session that is stored in a SERVER (it wouldnt make sense to store the session in the pc otherwise).
    // Session sees the cookie, authenticates and sees its own _id (which is basically the same _id that is in the DB). Session then goes to the DB and grabs the
    // information requested and delivers it to the website.
    // In other words, if your cookie is deleted you have to sign in again because you have no way to reach the session, which contains the id to go to the db an grab ur stuff or the stuff of the user
    // you are trying to access.

    // Notice: If I allow my app to connect to facebook and then delete the cookie: If I have a session open w/ facebook in my computer,
    // that is if I open a new tab and go to facebook and it opens without needing my credentials, it will allow me to sign in to my app (again: even after deleting the cookie).

  });

  newRoom.save((err) => {
    if (err) {
      next(err);
      return;
     } else {
      req.flash('success', 'Your room has been created');
      res.redirect('/rooms/index');
    }
  });
});

router.get('/rooms/index', ensure.ensureLoggedIn(), (req, res, next) => {
  Room.find({}, {}, (err, myRooms) => {
    if (err) {
      next(err);
      return;
    }

    res.render('rooms/index.ejs', {
      rooms: myRooms
    });
  });
});

module.exports = router;
