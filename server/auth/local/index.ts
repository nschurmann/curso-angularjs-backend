import express = require('express')
import { Model as User } from '../../api/user/user.model'
var jwt = require('jsonwebtoken')
var passport = require('passport')
var auth = require('../auth.service')
import * as config from '../../config/environment'

var router = express.Router()

function validationError(res: express.Response, statusCode?: number) {
  statusCode = statusCode || 422
  return function(err: any) {
    res.status(statusCode).json(err)
  }
}

router.post('/', function(req: any, res: any, next: Function) {
  passport.authenticate('local', function(err: any, user: any, info: any) {
    var error = err || info
    if (error) {
      return res.status(401).json(error)
    }
    if (!user) {
      return res.status(404).json({ message: 'Something went wrong, please try again.' })
    }

    var token = auth.signToken(user._id, user.role)
    res.json({ token: token })
  })(req, res, next)
})

router.post('/create', function create(req: any, res: any, next: any) {
  var newUser = new (<any>User)(req.body)
  newUser.provider = 'local'
  newUser.role = 'user'
  newUser.save(function(err: any, user: any) {
    if (err)
      return validationError(res)
    var token = jwt.sign({ _id: user._id }, config.default.secrets.session, {
      expiresIn: 60 * 60 * 5
    })
    res.json({ token })
  })
})

export default router
