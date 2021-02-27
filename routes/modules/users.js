const express = require('express')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('../../models/user')
const router = express.Router()

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'You have successfully logged out.')
  res.redirect('/users/login')
})

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  })
)

router.post('/register', (req, res) => {
  const warnings = []
  const { name, email, password, confirmPassword } = req.body
  const isValidEmail = /^[^\s@]+@[^\s@]+$/.test(email)
  if (!email || !password || !confirmPassword) {
    warnings.push('Please fill in all required fields.')
  }
  if (!isValidEmail) {
    warnings.push('Wrong email format.')
  }
  if (password !== confirmPassword) {
    warnings.push('Password and confirmation password do not match.')
  }
  User.findOne({ email })
    .then(user => {
      if (user) {
        warnings.push('Email is already registered.')
      }
      if (warnings.length > 0) {
        return res.render('register', { warnings, name, email, password, confirmPassword })
      }
      bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => {
          return User.create({
            name,
            email,
            password: hash
          })
            .then(() => res.redirect('/users/login'))
            .catch(error => console.log(error))
        })
    })
})

module.exports = router