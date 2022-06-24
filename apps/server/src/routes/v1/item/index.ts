import Express, { Response, Request } from 'express'
import { isNumber } from 'lodash'
import ControllerV1 from '../../../controller/v1'
import status from './status'
import type from './type'

const controller = ControllerV1.Item.Item

const route = Express()

route.get('/attribute', (_, res: Response) => {
  res.status(200)
  res.json({
    data: controller.attibutes,
  })
})

route.get('/', async (req: Request, res: Response) => {
  const { page: p, limit: l } = req.query || {}

  try {
    const page = isNumber(p) ? p : undefined
    const limit = isNumber(l) ? l : undefined
    const data = await controller.findAll({ page, limit })

    res.status(200)
    res.json(data)
  } catch (error) {
    res.status(500)
    res.json('Error')
  }
})

route.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params || {}

  try {
    const data = await controller.findOne(id)

    res.status(200)
    res.json(data)
  } catch (error: any) {
    res.status(500)
    res.json({
      message: error.message,
    })
  }
})

route.post('', async (req: Request, res: Response) => {
  const body = req.body || {}

  try {
    const data = await controller.create(body)

    res.status(200)
    res.json(data)
  } catch (error: any) {
    res.status(500)
    res.json({
      message: error.message,
    })
  }
})

route.put('/:id', async (req: Request, res: Response) => {
  const body = req.body || {}
  const { id } = req.params || {}

  try {
    const data = await controller.update(id, body)

    res.status(200)
    res.json(data)
  } catch (error: any) {
    res.status(500)
    res.json({
      message: error.message,
    })
  }
})

route.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params || {}

    const deleted = await controller.deleteByPk(id)
    res.json(deleted)
  } catch (error: any) {
    res.status(500)
    res.json({
      message: error.message,
    })
  }
})

route.use('/type', type)
route.use('/status', status)

export default route
