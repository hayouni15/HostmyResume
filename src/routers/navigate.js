const express = require('express')
const router = new express.Router()
const auth =require('../middleware/auth')


  router.get('/', function (req, res) {
    res.render('index.hbs')
  })
  router.get('/templates', function (req, res) {
    res.render('templates.hbs')
  })
  router.get('/accountManager/:tid',auth, function (req, res) {
    console.log(req.subscriber)
    res.render('accountmanager.hbs')
  })
  router.get('/pricing', function (req, res) {
    res.render('pricing.hbs')
  })
  router.get('/contact', function (req, res) {
    res.render('contact.hbs')
  })
  //to delete
  router.get('/portfolio', function (req, res) {
    res.render('portfolio.hbs')
  })
//template 1 
  router.get('/t1', function (req, res) {
    res.render('template1.hbs')
  })




  module.exports=router