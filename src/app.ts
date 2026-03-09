import { errorHandler } from "./middleware/errorHandler"
import bodyParser from 'koa-bodyparser'
import router from './routes/index'
import Koa from 'koa'

const PORT = 3000

const app = new Koa()

app.use(errorHandler)
app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})