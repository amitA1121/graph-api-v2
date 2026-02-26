import Router from 'koa-router'
import * as graph_controller from '../controllers/graph_controller'
import * as dfs_controller from '../controllers/dfs_query_controller'

const router = new Router()

router.get('/nodes', graph_controller.getAllNodes)
router.post('/nodes', graph_controller.createNode)
router.delete('/delete:id', graph_controller.deleteNode)

router.get('/edges', graph_controller.getAllEdge)
router.post('/edges/:a_id/:b_id', graph_controller.createEdge)
router.delete('/edges/:a/:b', graph_controller.deleteEdge)

router.get('/components', dfs_controller.getAllConnectedComponentss)
router.get('/cycle', dfs_controller.hasCycle)
router.get('/degree', dfs_controller.getDegrees)
router.get('/path/:start/:end', dfs_controller.getAllPathsFromTwoNodes)

export default router