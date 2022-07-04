import Express, { Response, Request } from 'express'
import { isNumber } from 'lodash'
import ControllerV1 from '@controller/v1'
import container from '@container'

const controller = container.get(ControllerV1.Item.Type)

// type
const route = Express()

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

export default route
