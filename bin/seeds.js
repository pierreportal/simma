// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Space = require("../models/Space")

const bcryptSalt = 10;

mongoose
  .connect('mongodb://localhost/server', { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let users = [
  {
    username: "alice",
    password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
  },
  {
    username: "bob",
    password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
  }
]

User.deleteMany()
  .then(() => {
    return User.create(users)
  })
  .then(usersCreated => {
    console.log(`${usersCreated.length} users created with the following id:`);
    console.log(usersCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect()
  })
  .catch(err => {
    mongoose.disconnect()
    throw err
  })



// const notes = ['G#/Ab', 'An', 'A#/Bb', 'Bn/Cb', 'B#/Cn', 'C#/Db', 'Dn', 'D#/Eb', 'En/Fb', 'E#/Fn', 'F#/Gb', 'Gn']
// const spaces = [
//   {
//     space: [
//       {
//         note: notes[Math.floor(Math.random() * notes.length)],
//         position: [Math.random() * 800, Math.random() * 800],
//         // id:'gdfshahjklskd',
//         flavor: 'vanilla',
//         octave: 2
//       },
//     ]
//   }
// ]