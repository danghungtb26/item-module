import Express from 'express'
import ControllerV1 from '@controllers/v1'
import container from '@container'
import { ItemTypeValidator } from '@validators'
import { handleValidationError } from '@middlewares/handleValidationError'

const controller = container.get(ControllerV1.Item.Type)

// type
const route = Express()

route.get('/', ItemTypeValidator.list, handleValidationError, controller.index)

route.get('/:id', ItemTypeValidator.show, handleValidationError, controller.show)

route.post('', ItemTypeValidator.create, handleValidationError, controller.create)

route.put('/:id', ItemTypeValidator.update, handleValidationError, controller.update)

route.delete('/:id', ItemTypeValidator.delete, handleValidationError, controller.delete)

export default route
