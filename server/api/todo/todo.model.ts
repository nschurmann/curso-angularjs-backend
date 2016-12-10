import mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
import { Schema } from 'mongoose'


export interface ITodo extends mongoose.Document {
  desc: string,
  completado: boolean
}

const TodoSchema = new Schema({
  desc: String,
  completado: Boolean,
  user: String,
})

export const Model = mongoose.model<ITodo>('Todo', TodoSchema)