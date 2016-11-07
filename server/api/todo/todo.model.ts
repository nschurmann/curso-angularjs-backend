import mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
import {Schema} from 'mongoose'


export interface ITodo extends mongoose.Document {
  desc: string,
  completed: boolean
}

const ParkingSchema = new Schema({
  desc: String,
  completed: Boolean,
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
})

export const Model = mongoose.model<ITodo>('Parking', ParkingSchema)