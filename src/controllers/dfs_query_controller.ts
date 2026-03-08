import { Context } from "koa";
import * as dfs_serviec from '../services/dfs_service'

export const getAllConnectedComponents = async (ctx: Context) => {
    ctx.body = await dfs_serviec.getAllConnectedComponents()
}

export const hasCycle = async (ctx: Context) => {
    ctx.body = await dfs_serviec.hasCycle()
}

export const getDegrees = async (ctx: Context) => {
    ctx.body = await dfs_serviec.getDegrees()
}

export const getAllPathsFromTwoNodes = async (ctx: Context) => {
    const start_node = Number(ctx.params.start)
    const end_node = Number(ctx.params.end)
    ctx.body = await dfs_serviec.getAllPathsFromTwoNodes(start_node, end_node)
}