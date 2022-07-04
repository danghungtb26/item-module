import container from '@container'
import Express, { Response, Request } from 'express'
import { isNumber } from 'lodash'
import ControllerV1 from '@controllers/v1'

const controller = container.get<ControllerV1.Category>(ControllerV1.Category)

const route = Express()
route.get('/', controller.index)

route.get('/:id', controller.show)

route.post('', controller.create)

route.put('/:id', controller.update)

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
