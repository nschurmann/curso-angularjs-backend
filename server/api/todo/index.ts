import * as express from'express'
import * as handler from'./todo.handler'
import { isAuthenticated } from '../../auth/auth.service'

var router = express.Router()

router.get('/', isAuthenticated(), handler.index)
router.post('/', isAuthenticated(), handler.create)
router.get('/:id', isAuthenticated(), handler.show)
router.put('/:id', isAuthenticated(), handler.update)
router.delete('/:id', isAuthenticated(), handler.destroy)

export default router
