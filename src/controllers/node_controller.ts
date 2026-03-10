import { Context } from 'koa'
import * as graphServies from '../services/node_service'
import { statusCode } from '../utils/statusCode'


export const getAllNodes = async (ctx: Context) => {
  ctx.body = await graphServies.getAllNodes()
}

export const createNode = async (ctx: Context) => {
  ctx.body = await graphServies.createNode()
  ctx.status = statusCode.CREATE
}

export const deleteNode = async (ctx: Context) => {
  const { id } = ctx.state.validatedParams as { id: number}
  
  await graphServies.deleteNode(id)
  ctx.status = statusCode.NO_CONTENT
}