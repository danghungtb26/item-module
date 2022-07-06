/* eslint-disable no-useless-escape */
/* eslint-disable prettier/prettier */
import container from '@container'
import Express from 'express'
import ControllerV1 from '@controllers/v1'
import status from './status'
import type from './type'

const controller = container.get(ControllerV1.Item.Item)

const route = Express()

route.get('/attribute', controller.getAttributes)

route.use('/type', type)
route.use('/status', status)

route.get('', controller.index)
route.get('/:id(\d+)', controller.show)

route.post('', controller.create)

route.put('/:id(\d+)', controller.update)

route.delete('/:id(\d+)', controller.delete)

export default route
