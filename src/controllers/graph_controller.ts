import { Context } from "koa";
import * as graphServies from '../services/graph_service'
import { statusCode } from '../utils/statusCode'
import { EdgeParamsCodec } from '../models/edge_model'
import { NodeParamsCodec } from '../models/node_model'

//--------nodes----------//
export const getAllNodes = async (ctx: Context) => {
    ctx.body = await graphServies.getAllNodes()
}

export const createNode = async (ctx: Context) => {
    ctx.body = await graphServies.createNode()
    ctx.status = statusCode.CREATE
}

export const deleteNoded = async (ctx: Context) => {
    const result = NodeParamsCodec.decode(ctx.params)
    result.caseOf({
        Left: (err) => {
            ctx.status = statusCode.BAD_REQUEST
            ctx.body = { error: err}
        },
        Right: async(data) => {
            ctx.status = statusCode.CREATE
            ctx.body = await graphServies.deleteNode(data.id)
        }
    })
}

//---------edges----------//
export const getAllEdges = async (ctx: Context) => {
    ctx.body = await graphServies.getAllEdgess()
}

export const createEdge = async (ctx: Context) => {
    const result = EdgeParamsCodec.decode(ctx.params)
    result.caseOf({
        Left: (err) => {
            ctx.status = statusCode.BAD_REQUEST
            ctx.body = { error: err }
        },
        Right: async (data) => {
            ctx.status = statusCode.CREATE
            ctx.body = await graphServies.createEdge(data.node_a_id, data.node_b_id)
        }
    })
}

export const deleteEdge = async (ctx: Context) => {
    const result = EdgeParamsCodec.decode(ctx.params)
    result.caseOf({
        Left: (err) => {
            ctx.status = statusCode.BAD_REQUEST
            ctx.body = { error: err }
        },
        Right: async (data) => {
            ctx.body = await graphServies.deleteEdge(data.node_a_id, data.node_b_id)
            ctx.status = statusCode.NO_CONTENT
        }
    })
}