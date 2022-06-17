import Express from 'express'
import category from './category'
import item from './item'

const route = Express()

route.use('/category', category)
route.use('/item', item)

export default route
