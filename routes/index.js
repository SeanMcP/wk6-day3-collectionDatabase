const express = require('express')
const Pokemon = require('../models/pokemon');
const router = express.Router()

let results = []
let singleResult = []

function getAll(req, res, next) {
  Pokemon.find().sort('number')
  .then(function(data) {
    results = data
    next()
  })
  .catch(function(err) {
    console.log(err);
  })
}
function getOne(req, res, next) {
  Pokemon.findOne({_id: req.params.id})
  .then(function(data) {
    results = data
    console.log('results: ', results);
    next()
  })
  .catch(function(err) {
    console.log('Error: ', err);
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

router.get('/delete/:id', function(req, res) {
  Pokemon.findOne({_id: req.params.id}).remove().exec()
  console.log('I clicked delete');
  res.redirect('/')
})

router.get('/edit/:id', getAll, function(req, res) {
  res.render('edit', {data: results})
})

module.exports = router
