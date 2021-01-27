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
  //在「sort({ 參數1: 參數2 })」中，參數 1 的位置似乎不能放變數，也不能放`${變數}`。因為參數 1 的位置要放的東西分別有 name、category、location，只好分成三個情況處理，但其他部分的程式碼都只是複製貼上。須再研究怎麼重構排序的程式碼
  const sort = req.query.sort
  let order = 'asc'
  switch (sort) {
    //參數 1 的位置放 name
    case 'asc':
    case 'desc':
      order = sort
      Restaurant.find()
        .lean()
        .sort({ name: order })
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
      return

    //參數 1 的位置放 category
    case 'category':
      Restaurant.find()
        .lean()
        .sort({ category: 'asc' })
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
      return

    //參數 1 的位置放 location
    case 'location':
      Restaurant.find()
        .lean()
        .sort({ location: 'asc' })
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
      return

    default:
      console.log('exceptional case occur')
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
      return
  }
})

module.exports = router
