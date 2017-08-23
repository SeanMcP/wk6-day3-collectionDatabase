const express = require('express')
const Pokemon = require('../models/pokemon');
const router = express.Router()

let results = []

function getAll(req, res, next) {
  Pokemon.find()
  .then(function(data) {
    results = data
    next()
  })
  .catch(function(err) {
    console.log(err);
  })
}

router.get('/', getAll, function(req, res) {
  res.render('index', {data: results})
})

router.post('/add', function(req, res) {

  let types = req.body.type.split(" ");

  Pokemon.create({
    name: req.body.name,
    number: req.body.number,
    stage: req.body.stage,
    type: types
  })
  .then(function(data) {
    console.log('Data: ', data);
  })
  .catch(function(err) {
    console.log('Error: ', err);
  })
  res.redirect('/')
})

module.exports = router
