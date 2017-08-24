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
  let id = req.params.id
  Pokemon.find({_id: id})
  .then(function(data) {
    results = data
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
    type: types,
    avatarUrl: req.body.avatarUrl
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
  res.redirect('/')
})

router.get('/edit/:id', getOne, function(req, res) {
  res.render('edit', {data: results})
})

router.post('/update/:id', function(req, res) {
  let id = req.params.id
  let types = req.body.type.split(" ");

  Pokemon.findOne({_id: id})
  .then(function(data) {

    data.name = req.body.name || data.name
    data.number = req.body.number || data.number
    data.type = types || data.type
    data.stage = req.body.stage || data.stage
    data.avatarUrl = req.body.avatarUrl || data.avatarUrl

    data.save(function(err) {
      if (err) {
        console.log('Error saving: ', err)
      }
    })
  })
  .catch(function(err) {
    console.log('Error finding: ', err);
  })
  res.redirect('/')
})

module.exports = router
