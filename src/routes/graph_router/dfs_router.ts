import Router from 'koa-router'
import * as dfs_controller from '../../controllers/dfs_query_controller'
import { validateParams } from '../../middleware/validation'
import { PathParamsCodec } from '../../dto/dfs_dto'
import { parseNumberParams } from '../../middleware/parse_number_params'


const dfsRouter = new Router()

dfsRouter.get('/components', dfs_controller.getAllConnectedComponents)
dfsRouter.get('/cycle', dfs_controller.hasCycle)
dfsRouter.get('/degree', dfs_controller.getDegrees)
dfsRouter.get('/path/:start/:end', validateParams(PathParamsCodec), parseNumberParams(['start', 'end']), dfs_controller.getAllPathsFromTwoNodes)

export default dfsRouter