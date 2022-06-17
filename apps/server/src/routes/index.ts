import Express from 'express'
import v1 from './v1'

const route = Express()

route.use('/v1', v1)

export default route
