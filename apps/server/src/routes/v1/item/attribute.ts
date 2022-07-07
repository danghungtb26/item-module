import container from '@container'
import ControllerV1 from '@controllers/v1'
import Express from 'express'

const route = Express()

const controller = container.get(ControllerV1.Item.Attribute)

route.get('', controller.index)

route.post('', controller.create)

export default route
