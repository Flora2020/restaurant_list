const db = require('../../config/mongoose')
const restaurantSeeds = require('./restaurantSeeds')
const Restaurant = require('../restaurant')

db.once('open', () => {
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



