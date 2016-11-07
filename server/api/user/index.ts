import * as express from'express'
import * as handler from'./user.handler'

var router = express.Router()

router.get('/', handler.index)
router.get('/:id', handler.show)
router.put('/:id', handler.update)
router.delete('/:id', handler.destroy)

export default router
