const mongoose = require('mongoose')
const restaurantSeeds = require('./restaurantSeeds')
const Restaurant = require('../restaurant')
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  const restaurants = restaurantSeeds.results
  restaurants.forEach(restaurant => {
    Restaurant.create({
      name: restaurant.name,
      name_en: restaurant.name_en,
      category: restaurant.category,
      image: restaurant.image,
      location: restaurant.location,
      phone: restaurant.phone,
      google_map: restaurant.google_map,
      rating: Number(restaurant.rating),
      description: restaurant.description
    })
  })
  console.log('done!')
})



