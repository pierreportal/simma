const express = require("express");
// const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const Space = require('../models/Space.js')

router.get('/:userName', (req, res) => {
  // console.log(req.params.userName)
  User.findOne({ username: req.params.userName }).then(user => {
    console.log(user)
    Space.find({ owner: user._id }).then(data => {
      res.json(data);
    });
  }).catch(err => console.log(err))
});


router.get('/porfolio', (req, res) => {
  Space.find({ owner: req.user }).then(response => {
    res.json(response)
  }).catch(err => {
    res.json(err)
  });
});

router.post('/:userName/new-space', (req, res) => {
  const { space, spaceName } = req.body
  const removeSpaceFromUrl = (str) => {
    return str.split(" ").join("-")
  }
  console.log(space, spaceName)
  Space.create({ owner: req.user._id, nodes: space, title: removeSpaceFromUrl(spaceName), ownerName: req.user.username }).then(response => {
    res.json(response)
  }).catch(err => {
    res.json(err)
  });
});


router.get('/:userName/:spaceName', (req, res) => {
  let userSpaces = null;
  User.findOne({ username: req.params.userName }).then(user => {
    Space.find({ owner: user, title: req.params.spaceName }).then(data => {
      userSpaces = data
      res.json(userSpaces);
    });
  }).catch(err => console.log(err))
});

// delete spacee
router.post('/:userName/:spaceName/delete', (req, res) => {
  ///user/:userName/:spaceName/delete
  Space.findOneAndDelete({ _id: req.body.id }).then(() => {
    res.json({ message: 'Delete success.' })
  }).catch(err => {
    res.json(err)
  });
});

router.post('/:userName/like-space', (req, res) => {
  Space.findOne({ _id: req.body.spaceId }).then(() => {
    User.findOneAndUpdate({ username: req.body.user }, { $push: { favoriteSpaces: req.body.spaceId } }).then(() => {
      res.json({ message: "Added to favorites" })
    })
  }).catch(err => res.json(err))
})

router.get('/getall', (req, res) => {
  console.log('request received')
  Space.find().then(data => {
    console.log(data)
    res.json(data)
  }).catch(err => res.json(err))
});

module.exports = router

