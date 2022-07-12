/* eslint-disable no-useless-escape */
/* eslint-disable prettier/prettier */
import container from '@container'
import Express from 'express'
import ControllerV1 from '@controllers/v1'
import status from './status'
import attribute from './attribute'
import type from './type'

const controller = container.get(ControllerV1.Item.Item)

const route = Express()

route.use('/attribute', attribute)

route.use('/type', type)
route.use('/status', status)

route.get('', controller.index)

route.get('/:id', controller.show)

route.post('', controller.create)

route.put('/:id', controller.update)

route.delete('/:id', controller.delete)

export default route
