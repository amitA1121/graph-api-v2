import { Context } from 'koa'
import * as graphServices from '../services/edge_service'
import { statusCode } from '../utils/statusCode'

type ParsedEdgeParams = {
    source_node_id: number
    target_node_id: number
}

//FIX: status
export const getAllEdges = async (ctx: Context) => {
    ctx.body = await graphServices.getAllEdges()
}

export const createEdge = async (ctx: Context) => {
    const { source_node_id, target_node_id } = ctx.state.validatedParams as ParsedEdgeParams
    
    const edge = await graphServices.createEdge(source_node_id, target_node_id)
    ctx.status = statusCode.CREATE
    ctx.body = edge
}

export const deleteEdge = async (ctx: Context) => {
    const { source_node_id, target_node_id } = ctx.state.validatedParams as ParsedEdgeParams

    await graphServices.deleteEdge(source_node_id, target_node_id)
    ctx.status = statusCode.NO_CONTENT
}