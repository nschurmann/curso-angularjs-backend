import * as express from'express'
import * as handler from'./todo.handler'
import { isAuthenticated } from '../../auth/auth.service'

var router = express.Router()

router.get('/:user', handler.index)
router.post('/:user', handler.create)
router.get('/:user/:id', handler.show)
router.put('/:user/:id', handler.update)
router.delete('/:user/:id', handler.destroy)

export default router
