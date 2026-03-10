import Router from 'koa-router'
import * as edge_controller from '../../controllers/edge_controller'
import { validateParams } from '../../middleware/validation'
import { EdgeParamsCodec } from '../../models/edge_model'
import { parseNumberParams } from '../../middleware/parse_number_params'

const edgeRouter = new Router()

edgeRouter.get('/edges', edge_controller.getAllEdges)
edgeRouter.post('/edges/:source_node_id/:target_node_id', validateParams(EdgeParamsCodec), edge_controller.createEdge)
edgeRouter.delete('/edges/:source_node_id/:target_node_id', validateParams(EdgeParamsCodec), parseNumberParams(['start_node_id', 'target_node_id']), edge_controller.deleteEdge)

export default edgeRouter