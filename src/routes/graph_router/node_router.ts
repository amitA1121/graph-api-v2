import Router from 'koa-router'
import * as node_controller from '../../controllers/node_controller'
import { validateParams } from '../../middleware/validation'
import { NodeParamsCodec } from '../../dto/node_dto'
import { parseNumberParams } from '../../middleware/parse_number_params'

const nodeRouter = new Router()

nodeRouter.get('/nodes', node_controller.getAllNodes)
nodeRouter.post('/nodes', node_controller.createNode)
nodeRouter.delete('/nodes/:node_id', validateParams(NodeParamsCodec), parseNumberParams(['node_id']), node_controller.deleteNode)

export default nodeRouter