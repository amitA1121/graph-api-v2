import { Context } from "koa";
import * as graphServies from '../services/graph_service'
import { statusCode } from '../utils/statusCode'


//--------nodes----------//
export const getAllNodes = async (ctx: Context) => {
    ctx.body = await graphServies.getAllNodes()
}

export const createNode = async (ctx: Context) => {
    ctx.body = await graphServies.createNode()
    ctx.status = statusCode.CREATE;
}

export const deleteNode = async (ctx: Context) => {
    const id = Number(ctx.params.id)
    await graphServies.deleteNode(id)
    ctx.status = statusCode.NO_CONTENT
}

//---------edges----------//
export const getAllEdges = async (ctx: Context) => {
    ctx.body = await graphServies.getAllEdgess()
}

export const deleteEdge = async (ctx: Context) => {
    const a = Number(ctx.params.a)
    const b = Number(ctx.params.b)
    await graphServies.deleteEdge(a, b)
    ctx.status = statusCode.NO_CONTENT
}

export const createEdge = async (ctx: Context) => {
    const a_id = Number(ctx.params.a_id)
    const b_id = Number(ctx.params.b_id)
    ctx.body = await graphServies.createEdge(a_id, b_id)
    ctx.status = statusCode.CREATE
}