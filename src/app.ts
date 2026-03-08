import { errorHandler } from "./middleware/errorHandler"
import bodyParser from 'koa-bodyparser'
import router from './routes/index'
import Koa from 'koa'

const app = new Koa()
app.use(errorHandler)
app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000, () => {
    console.log('server running on port 3000')
})

export default app