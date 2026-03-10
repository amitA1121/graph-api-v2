import { Context } from 'koa'
import * as graphServies from '../services/edge_service'
import { statusCode } from '../utils/statusCode'


export const getAllEdges = async (ctx: Context) => {
    ctx.body = await graphServies.getAllEdgess()
}

export const createEdge = async (ctx: Context) => {
    const { source_node_id, target_node_id} = ctx.state.validatedParams as {
        source_node_id: number,
        target_node_id: number 
    }
  
    ctx.status = statusCode.CREATE
    ctx.body = await graphServies.createEdge(source_node_id, target_node_id)
}

export const deleteEdge = async (ctx: Context) => {
    const {source_node_id, target_node_id} = ctx.state.validatedParams as {
        source_node_id: number,
        target_node_id: number
    }

  await graphServies.deleteEdge(source_node_id, target_node_id)
  ctx.status = statusCode.NO_CONTENT
}