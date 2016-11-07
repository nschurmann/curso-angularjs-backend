var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
import { IUser } from '../../api/user/user.model'

function localAuthenticate(User: any, email: string, password: string, done: Function) {
  User.findOne({
    email: email.toLowerCase().trim()
  })
    .exec(function(err: any, user: any) {
      if(err)
        return done(err)

      if (!user) {
        return done(null, false, {
          message: 'This email is not registered.'
        })
      }
      user.authenticate(password, function(authError: any, authenticated: any) {
        if (authError) {
          return done(authError)
        }
        if (!authenticated) {
          return done(null, false, {
            message: 'This password is not correct.'
          })
        } else {
          return done(null, user)
        }
      })
    })
}

exports.setup = function(User: any, config: any) {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password' // this is the virtual field on the model
  }, function(email: string, password: string, done: Function) {
    return localAuthenticate(User, email, password, done)
  }))
}
