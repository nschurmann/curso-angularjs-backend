import express = require('express')
import auth from './auth'
import user from './api/user'
import todo from './api/todo'

const errors = require('./components/errors')
const path = require('path')

module.exports = (app: any) => {

  // Insert routes below
  app.use('/api/users', user)
  app.use('/api/todos', todo)

  app.use('/auth', auth)

  // don't explode if no user token is provided.
  app.use((err: any, req: express.Request, res: express.Response, next: Function) => {
    if (err.name === 'UnauthorizedError') { res.sendStatus(401) }
  })

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(errors[404])

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req: express.Request, res: express.Response) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'))
    })
}
