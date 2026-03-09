import { Context } from 'koa'
import * as graphServies from '../services/graph_service'
import { statusCode } from '../utils/statusCode'
import { EdgeParamsCodec } from '../models/edge_model'
import { NodeParamsCodec } from '../models/node_model'

const errMsg = 'node_a_id and node_b_id must be type of number'

//--------nodes----------//
export const getAllNodes = async (ctx: Context) => {
    ctx.body = await graphServies.getAllNodes()
}

export const createNode = async (ctx: Context) => {
    ctx.body = await graphServies.createNode()
    ctx.status = statusCode.CREATE
}

export const deleteNode = async (ctx: Context) => {
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

  return result.caseOf({
    Left: (err) => {
      ctx.status = statusCode.BAD_REQUEST
      ctx.body = { error: err }
    },
    Right: async (data) => {
      const node_a_id = Number(data.node_a_id)
      const node_b_id = Number(data.node_b_id)

      if (Number.isNaN(node_a_id) || Number.isNaN(node_b_id)) {
        ctx.status = statusCode.BAD_REQUEST
        ctx.body = { error: errMsg }
        return
      }

      ctx.status = statusCode.CREATE
      ctx.body = await graphServies.createEdge(node_a_id, node_b_id)
    }
  })
}

export const deleteEdge = async (ctx: Context) => {
  const result = EdgeParamsCodec.decode(ctx.params)

  return result.caseOf({
    Left: (err) => {
      ctx.status = statusCode.BAD_REQUEST
      ctx.body = { error: err }
    },
    Right: async (data) => {
      const node_a_id = Number(data.node_a_id)
      const node_b_id = Number(data.node_b_id)

      if (Number.isNaN(node_a_id) || Number.isNaN(node_b_id)) {
        ctx.status = statusCode.BAD_REQUEST
        ctx.body = { error: errMsg }
        return
      }

      await graphServies.deleteEdge(node_a_id, node_b_id)
      ctx.status = statusCode.NO_CONTENT
    }
  })
}