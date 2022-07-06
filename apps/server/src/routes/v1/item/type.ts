import Express from 'express'
import ControllerV1 from '@controllers/v1'
import container from '@container'
import { ItemTypeValidator } from '@validators'
import { handleValidationError } from '@middlewares/handleValidationError'

const controller = container.get(ControllerV1.Item.Type)

// type
const route = Express()

route.get('/', controller.index)

route.get('/:id', controller.show)

route.post('', ItemTypeValidator.create, handleValidationError, controller.create)

route.put('/:id', ItemTypeValidator.update, handleValidationError, controller.update)

route.delete('/:id', controller.delete)

export default route
