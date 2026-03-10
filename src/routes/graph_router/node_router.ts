import Router from 'koa-router'
import * as node_controller from '../../controllers/node_controller'
import { validateParams } from '../../middleware/validation'
import { NodeParamsCodec } from '../../models/node_model'
import { parseNumberParams } from '../../middleware/parse_number_params'

const nodeRouter = new Router()

nodeRouter.get('/nodes', node_controller.getAllNodes)
nodeRouter.post('/nodes', node_controller.createNode)
nodeRouter.delete('/nodes/:id', validateParams(NodeParamsCodec), parseNumberParams(['id']), node_controller.deleteNode)

export default nodeRouter