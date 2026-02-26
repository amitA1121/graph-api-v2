import { Context } from "koa";
import * as graphServies from '../services/graph_service'
import { NO_CONTENT , OK, NOT_FOUND, CREATE} from '../utils/statusCode'


//--------nodes----------
export const getAllNodes = async (ctx: Context) => {
    ctx.body = await graphServies.getAllNodes()
}

export const createNode = async (ctx: Context) => {
    ctx.body = await graphServies.createNode()
    ctx.status = CREATE;
}

export const deleteNode = async (ctx: Context) => {
    const id = Number(ctx.params.id)
    await graphServies.deleteNode(id)
    ctx.status = NO_CONTENT
}

//---------edges----------
export const getAllEdge = async (ctx: Context) => {
    ctx.body = await graphServies.getAllEdges()
}

export const deleteEdge = async (ctx: Context) => {
    const a = Number(ctx.params.a)
    const b = Number(ctx.params.b)
    await graphServies.deleteEdge(a, b)
    ctx.status = NO_CONTENT
}

//createEdge
export const createEdge = async (ctx: Context) => {
    const body = ctx.request.body as {node_a_is: number, node_b_id: number}
    const a_id = Number(body.node_a_is)
    const b_id = Number(body.node_b_id)
    await graphServies.createEdge(a_id, b_id)
    ctx.status = CREATE
}