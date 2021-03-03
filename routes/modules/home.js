const Restaurant = require('../../models/restaurant')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

router.get('/search', (req, res) => {
  const userId = req.user._id
  const keyword = req.query.keyword.trim().toLowerCase()
  const sort = req.query.sort
  let order = 'asc'
  let field = 'name'

  switch (sort) {
    case 'desc':
      order = sort
      break
    case 'category':
    case 'location':
      field = sort
      break
    default:
  }

  Restaurant.find({ userId })
    .sort({ [field]: order })
    .lean()
    .then(restaurants => {
      return restaurants.filter(
        (restaurant) => {
          return restaurant.name.toLowerCase().includes(keyword) || restaurant.category.toLowerCase().includes(keyword)
        })
    })
    .then(restaurants => {
      res.render('index', { restaurants, keyword, sort })
    })
    .catch(error => console.log(error))
})

module.exports = router
