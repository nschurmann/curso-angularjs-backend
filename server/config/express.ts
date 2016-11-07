import express = require('express')
const favicon = require('serve-favicon')
const morgan = require('morgan')
const compression = require('compression')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const errorHandler = require('errorhandler')
const path = require('path')
import config from './environment'
const passport = require('passport')

export = function(app: any) {
  var env = app.get('env')

  app.set('views', config.root + '/server/views')
  app.set('view engine', 'pug')
  app.use(compression())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(methodOverride())
  app.use(cookieParser())
  app.use(passport.initialize())
  app.use(function(req: express.Request, res: express.Response, next: Function) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.set('appPath', path.join(config.root, 'client'))

  if ('production' === env) {
    app.use(favicon(path.join(config.root, 'client', 'favicon.ico')))
    app.use(express.static(app.get('appPath')))
    app.use(morgan('dev'))
  }

  if ('development' === env) {
    app.use(require('connect-livereload')())
  }

  if ('development' === env || 'test' === env) {
    app.use(express.static(path.join(config.root, '.tmp')))
    app.use(express.static(app.get('appPath')))
    app.use(morgan('dev'))
    app.use(errorHandler()) // Error handler - has to be last
  }
}
