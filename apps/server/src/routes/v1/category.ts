import container from '@container'
import Express from 'express'
import ControllerV1 from '@controllers/v1'
import { CategoryValidator } from '@validators'
import { handleValidationError } from '@middlewares/handleValidationError'

const controller = container.get<ControllerV1.Category>(ControllerV1.Category)

const route = Express()
route.get('/', CategoryValidator.list, handleValidationError, controller.index)

route.get('/:id', CategoryValidator.show, handleValidationError, controller.show)

route.post('', CategoryValidator.create, handleValidationError, controller.create)

route.put('/:id', CategoryValidator.update, handleValidationError, controller.update)

route.delete('/:id', CategoryValidator.delete, handleValidationError, controller.delete)

export default route
