import * as express from 'express'
var passport = require('passport')
import config from '../config/environment'
var jwt = require('jsonwebtoken')
var expressJwt = require('express-jwt')
var compose = require('composable-middleware')
import {Model as User} from '../api/user/user.model'

var validateJwt = expressJwt({
  secret: config.secrets.session
})

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
export function isAuthenticated() {
  return compose()
    // Validate jwt
    .use(function(req: express.Request & {query: any}, res: express.Response, next: Function) {
      // allow access_token to be passed through query parameter as well
      if (req.query && req.query.hasOwnProperty('access_token')) {
        (<any>req.headers).authorization = 'Bearer ' + req.query.access_token
      }
      validateJwt(req, res, next)
    })
    // Attach user to request
    .use(function(req: express.Request & {user: any, query: any}, res: express.Response, next: Function) {
      User.findById(req.user._id).exec()
        .then(user => {
          if (!user) {
            return res.status(401).end()
          }
          req.user = user
          delete req.query.access_token
          next()
        })
        .catch((err: any) => next(err))
    })
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
export function hasRole(roleRequired: string) {
  if (!roleRequired) {
    throw new Error('Required role needs to be set')
  }

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req: express.Request & {user: any}, res: express.Response, next: Function) {
      if (config.userRoles.indexOf(req.user.role) >=
        config.userRoles.indexOf(roleRequired)) {
        next()
      } else {
        res.status(403).send('Forbidden')
      }
    })
}

/**
 * Returns a jwt token signed by the app secret
 */
export function signToken(id: any, role: string) {
  return jwt.sign({ _id: id, role: role }, config.secrets.session, {
    expiresIn: 60 * 60 * 5
  })
}

/**
 * Set token cookie directly for oAuth strategies
 */
export function setTokenCookie(req: express.Request & {user: any}, res: express.Response) {
  if (!req.user) {
    return res.status(404).send('It looks like you aren\'t logged in, please try again.')
  }
  var token = signToken(req.user._id, req.user.role)
  res.cookie('token', token)
  res.redirect('/')
}
