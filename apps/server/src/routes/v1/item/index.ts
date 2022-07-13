/* eslint-disable no-useless-escape */
/* eslint-disable prettier/prettier */
import container from '@container'
import Express from 'express'
import ControllerV1 from '@controllers/v1'
import { ItemValidator } from '@validators'
import { handleValidationError } from '@middlewares/handleValidationError'
import status from './status'
import attribute from './attribute'
import type from './type'

const controller = container.get(ControllerV1.Item.Item)

const route = Express()

route.use('/attribute', attribute)

route.use('/type', type)
route.use('/status', status)

route.get('', ItemValidator.list, handleValidationError, controller.index)

route.get('/:id', ItemValidator.show, handleValidationError, controller.show)

route.post('', ItemValidator.create, handleValidationError, controller.create)

route.put('/:id', ItemValidator.update, handleValidationError, controller.update)

route.delete('/:id', ItemValidator.delete, handleValidationError, controller.delete)

export default route
