import * as express from 'express'
import { Model as Todo } from './todo.model'
import { respondWithResult, handleError, handleEntityNotFound, saveUpdates, removeEntity, handleProperty } from '../utils'

// Gets a list of Todos
export function index(req: express.Request & {params: any}, res: express.Response) {
  return Todo.find({ user: req.params.user }).exec()
    .then(respondWithResult(res, 200))
    .catch(handleError(res))
}

// Gets a single Todo from the DB
export function show(req: express.Request & {params: any}, res: express.Response) {
  return Todo.findOne({_id: req.params.id, user: req.params.user}).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res, 200))
    .catch(handleError(res))
}

// Creates a new Todo in the DB
export function create(req: express.Request & {params: any}, res: express.Response) {
  return Todo.create(Object.assign({}, req.body, {user: req.params.user}))
    .then(respondWithResult(res, 201))
    .catch(handleError(res))
}

// Updates an existing Todo in the DB
export function update(req: express.Request & {params: any}, res: express.Response) {
  if (req.body._id) {
    delete req.body._id
  }

  return Todo.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(handleProperty(res, req.params.user))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res, 204))
    .catch(handleError(res))
}

// Deletes a Todo from the DB
export function destroy(req: express.Request & {params: any}, res: express.Response) {
  return Todo.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(handleProperty(res, req.params.user))
    .then(removeEntity(res))
    .catch(handleError(res))
}