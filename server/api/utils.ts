import * as _ from 'lodash'
import * as express from 'express'

export const respondWithResult = (res: express.Response, statusCode: number) => {
  statusCode = statusCode || 200
  return function(entity: any) {
    if (entity)
      res.status(statusCode).json(entity)
  }
}

export const saveUpdates = (updates: any) => {
  return function(entity: any) {
    var updated = _.merge(entity, updates)
    return updated.save()
      .then((updated: any) => updated)
  }
}

export const removeEntity = (res: express.Response) => {
  return function(entity: any) {
    if (entity)
      return entity.remove()
        .then(() => res.status(204).end())
  }
}

export const handleEntityNotFound = (res: express.Response) => {
  return function(entity: any) {
    if (!entity) {
      res.status(404).end()
      return null
    }
    return entity
  }
}

export const handleError = (res: express.Response, statusCode?: number) => {
  statusCode = statusCode || 500
  return function(err: any) {
    res.status(statusCode).send(err)
  }
}

export const handleProperty = (res: express.Response, userId: string) =>
  (entity: {createdBy: string}) => {
    if (entity.createdBy !== userId) {
      res.status(404).send('Entity not found.')
    }
  }