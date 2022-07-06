import container from '@container'
import Express, { Response, Request } from 'express'
import { isNumber } from 'lodash'
import ControllerV1 from '@controllers/v1'

const controller = container.get(ControllerV1.Item.Status)

// status
const route = Express()

route.get('/', controller.index)

route.get('/:id', controller.show)

route.post('', controller.create)

route.put('/:id', controller.update)

route.put('/swap-order', controller.swapOrder)

route.delete('/:id', controller.delete)

export default route
