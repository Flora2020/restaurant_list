
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/user')

module.exports = app => {
  // 初始化 Passport 模組
  app.use(passport.initialize())
  app.use(passport.session())
  //設定本地登入策略
  passport.use(new LocalStrategy(
    { usernameField: 'email' },
    (email, password, done) => {
      User.findOne({ email })
        .then(user => {
          if (!user) {
            return done(null, false, { message: 'This email is not registered.' })
          }
          bcrypt.compare(password, user.password)
            .then((isMatch) => {
              if (!isMatch) {
                return done(null, false, { message: 'Incorrect password.' })
              }
              return done(null, user)
            })
        })
        .catch(error => done(error, false))
    }
  ))
  //設定序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  });

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(error => done(error, null))
  });
}