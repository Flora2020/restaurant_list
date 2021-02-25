const express = require('express')
const User = require('../../models/user')
const router = express.Router()

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/login', (req, res) => {
  res.send('post login page')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const isValidEmail = /^[^\s@]+@[^\s@]+$/.test(email)
  if (!isValidEmail) {
    console.log('Wrong email format.')
    return res.render('register', { name, email, password, confirmPassword })
  }
  if (password !== confirmPassword) {
    console.log('password and confirmation password do not match.')
    return res.render('register', { name, email, password, confirmPassword })
  }
  User.findOne({ email })
    .then(user => {
      if (user) {
        console.log('Email is already registered.')
        return res.render('register', { name, email, password, confirmPassword })
      }
      return User.create({
        name,
        email,
        password
      })
        .then(() => res.redirect('/users/login'))
        .catch(error => console.log(error))
    })
})

module.exports = router