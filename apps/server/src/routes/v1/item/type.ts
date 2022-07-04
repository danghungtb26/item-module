import Express from 'express'
import ControllerV1 from '@controllers/v1'
import container from '@container'

const controller = container.get(ControllerV1.Item.Type)

// type
const route = Express()

route.get('/', controller.index)

route.get('/:id', controller.show)

route.post('', controller.create)

route.put('/:id', controller.update)

route.delete('/:id', controller.delete)

export default route
