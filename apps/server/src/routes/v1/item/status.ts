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

route.put('/wrap-order', async (req: Request, res: Response) => {
  const { start, end } = req.body || {}

  if (!isNumber(start) || !isNumber(end)) {
    res.status(400)
    res.json({ message: 'Not found' })
    return
  }

  try {
    const data = await controller.wrapOrder(start, end)

    res.status(200)
    res.json(data)
  } catch (error: any) {
    res.status(500)
    res.json({
      message: error.message,
    })
  }
})

route.delete('/:id', controller.delete)

export default route
