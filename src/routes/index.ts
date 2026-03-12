import Router from 'koa-router'
import nodeRouter from './graph_router/node_router'
import edgeRouter from './graph_router/edge_router'
import dfsRouter from './graph_router/dfs_router'

const router = new Router()

router.use(nodeRouter.routes(), nodeRouter.allowedMethods())
router.use(edgeRouter.routes(), edgeRouter.allowedMethods())
router.use(dfsRouter.routes(), dfsRouter.allowedMethods())

export default router