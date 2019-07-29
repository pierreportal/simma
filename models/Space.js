const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const spaceSchema = new Schema({
  title: String,
  owner: Schema.Types.ObjectId,
  nodes: [Object],
  ownerName: String
  // area: [Number], // H x W
})

const Space = mongoose.model('Space', spaceSchema)
module.exports = Space

