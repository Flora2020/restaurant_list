const Restaurant = require('../../models/restaurant')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  Restaurant.find()
    .lean()
    .then(restaurants => {
      return restaurants.filter(
        (restaurant) => {
          return restaurant.name.toLowerCase().includes(keyword) || restaurant.category.toLowerCase().includes(keyword)
        })
    })
    .then(restaurants => {
      res.render('index', { restaurants, keyword })
    })
    .catch(error => console.log(error))
})

module.exports = router
