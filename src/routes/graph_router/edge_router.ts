import Router from 'koa-router'
import * as edge_controller from '../../controllers/edge_controller'
import { validateParams } from '../../middleware/validation'
import { EdgeParamsCodec } from '../../dto/edge_dto'
import { parseNumberParams } from '../../middleware/parse_number_params'

const edgeRouter = new Router()

//FIX: 
// 1. no, this is Domain! 
// 2. this is bad design, what guarentees these free string keys exist where you want them? HINT: how do I extract the keys of an type in typescript? 
// 3. is this a good name for what this does?
const edge = ['source_node_id', 'target_node_id']

edgeRouter.get('/edges', edge_controller.getAllEdges)
edgeRouter.post('/edges/:source_node_id/:target_node_id', validateParams(EdgeParamsCodec),parseNumberParams(edge), edge_controller.createEdge)
edgeRouter.delete('/edges/:source_node_id/:target_node_id', validateParams(EdgeParamsCodec), parseNumberParams(edge), edge_controller.deleteEdge)

export default edgeRouter