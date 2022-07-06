import { Container } from 'inversify'
import ControllerV1 from '@controllers/v1'

const container = new Container()

container.bind(ControllerV1.Category).toSelf()
container.bind(ControllerV1.Item.Item).toSelf()
container.bind(ControllerV1.Item.Type).toSelf()
container.bind(ControllerV1.Item.Status).toSelf()
container.bind(ControllerV1.Item.Attribute).toSelf()

export default container
