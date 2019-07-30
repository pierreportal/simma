const express = require("express");
// const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const Space = require('../models/Space.js')

router.get('/:userName', (req, res) => {
  // console.log(req.params.userName)
  User.findOne({ username: req.params.userName }).then(user => {
    Space.find({ owner: user._id }).then(data => {
      res.json(data);
    });
  }).catch(err => console.log(err))
});

// router.put('/settings', (req, res) => {
//   const { username, followingUsers, favoriteSpaces, portfolio } = req.body
//   User.findOneAndUpdate({ _id: req.user._id },
//     { username, followingUsers, favoriteSpaces, portfolio },
//     { new: true }).then(data => {
//       res.json(data)
//     }).catch(err => {
//       res.json(err)
//     });
// });

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

// edit space
router.get('/:userName/:spaceName', (req, res) => {
  let userSpaces = null;
  User.findOne({ username: req.params.userName }).then(user => {
    Space.find({ title: req.params.spaceName }).then(data => {
      userSpaces = data
      res.json(userSpaces);
    });
  }).catch(err => console.log(err))
});
// router.get('/:userName/:spaceName', (req, res) => {
//   let userSpaces = null;
//   Space.find().then(data => {
//     userSpaces = data
//     res.json(userSpaces);
//   }).catch(err => console.log(err))
// });





























// router.get('/allspaces', (req, res) => {
//   Space.find({}).then(data => {
//     res.json(data);
//   }).catch(err => console.log(err))
// });


// router.put('/portfolio/:spaceName/edit', (req, res) => {
//   const nodes = req.body.nodes
//   Space.findOneAndUpdate({ title: req.params.spaceName },
//     { owner: req.user, node: nodes },
//     { new: true }).then(data => {
//       res.json(data)
//     }).catch(err => {
//       res.json(err)
//     });
// });

// // delete spacee
// router.delete('/portfolio/:spaceId', (req, res) => {
//   Space.findOneAndDelete({ _id: req.params.spaceId }).then(data => {
//     res.json({ message: 'Delete success.' })
//   }).catch(err => {
//     res.json(err)
//   });
// });


module.exports = router

