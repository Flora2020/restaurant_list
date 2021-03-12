require('../../config/dotenv').envLoader()
const db = require('../../config/mongoose')
const restaurantSeeds = require('./restaurantSeeds').results
const userSeeds = require('./userSeeds')
const Restaurant = require('../restaurant')
const User = require('../user')


db.once('open', () => {
  const users = []
  return Promise.all(userSeeds.map(userSeed => {
    return User.findOne({ email: userSeed.email })
  }))
    .then((users) => {
      return Promise.all(restaurantSeeds.map((restaurant, index) => {
        if (0 <= index && index <= 2) {
          restaurant.userId = users[0]._id
          return Restaurant.create(restaurant)
        }
        if (3 <= index && index <= 5) {
          restaurant.userId = users[1]._id
          return Restaurant.create(restaurant)
        }
        restaurant.userId = users[2]._id
        return Restaurant.create(restaurant)
      }))
    })
    .then(() => {
      console.log('restaurants done.')
      process.exit()
    })
    .catch(error => {
      console.log(error)
      process.exit()
    })
})



