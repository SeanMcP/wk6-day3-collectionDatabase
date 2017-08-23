const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost:27017/pokeDirectory')

const pokeSchema = new Schema({
  name: {type: String, required: true, unique: true},
  type: [String],
  number: {
    type: Number,
    min: [1, "There is no Pokemon before number one."],
    max: [151, "I do not recognize Pokemon over 151."],
    required: true,
    unique: true,
  },
  stage: {
    type: String,
    validate: [function(val) {
      return Number(val) === 1 || Number(val) === 2 || val === "basic"
    }, "There are no baby Pokemon. EXs and Mega EXs are stupid."]
  }
})

const Pokemon = mongoose.model('Pokemon', pokeSchema)

module.exports = Pokemon
