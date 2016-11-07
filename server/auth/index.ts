import * as express from 'express'
var passport = require('passport')
var config = require('../config/environment')
import { Model as User } from '../api/user/user.model'
import local from './local'

// Passport Configuration
require('./local/passport').setup(User, config)

var router = express.Router()

router.use('/local', local)

export default router
