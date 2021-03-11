if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const bcrypt = require('bcryptjs')
const db = require('../../config/mongoose')
const User = require('../user')
const userSeeds = require('./userSeeds')

db.once('open', () => {
  return Promise.all(userSeeds.map((seed, index) => {
    return User.findOne({ email: seed.email })
      .then((user) => {
        if (user) {
          console.log(`${user.email} is already registered.`)
          return userSeeds.splice(index, 1)
        }
      })
  }))
    .then(() => {
      return Promise.all(userSeeds.map((seed) => {
        return bcrypt.genSalt(10)
          .then(salt => bcrypt.hash(seed.password, salt))
          .then(hash => {
            seed.password = hash
          })
      }))
    })
    .then(() => {
      User.insertMany(userSeeds)
        .then(() => {
          console.log('users done!')
          process.exit()
        })
        .catch(error => {
          console.log(error)
          process.exit()
        })
    })
})