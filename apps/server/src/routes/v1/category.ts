import Express, { Response, Request } from 'express'
import ControllerV1 from '../../controller/v1'

const controller = ControllerV1.Category

const route = Express()

route.get('/', async (_req: Request, res: Response) => {
  const data = await controller.findAll({})

  try {
    res.status(200)
    res.json(data)
  } catch (error) {
    res.status(500)
    res.json('Error')
  }
})

route.get('/:id', async (req: Request, res: Response) => {
  const id = req.query.id as string
  if (typeof id !== 'string') {
    res.status(404)
    res.statusMessage = 'Not Found'
    return
  }

  const data = await controller.findByPk(id)

  res.status(200)
  res.json(data)
})

export default route
