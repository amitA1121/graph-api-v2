import { Context } from 'koa'
import * as graphServcies from '../services/node_service'
import { statusCode } from '../utils/statusCode'

type ParsedNodeParams = {
  node_id: number
}

export const getAllNodes = async (ctx: Context) => {
  ctx.body = await graphServcies.getAllNodes()
}

export const createNode = async (ctx: Context) => {
  const node = await graphServcies.createNode()

  ctx.status = statusCode.CREATE
  ctx.body = node
}

export const deleteNode = async (ctx: Context) => {
  const { node_id } = ctx.state.validatedParams as ParsedNodeParams
  
  await graphServcies.deleteNode(node_id)
  ctx.status = statusCode.NO_CONTENT
}