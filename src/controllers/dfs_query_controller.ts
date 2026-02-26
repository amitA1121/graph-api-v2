import { Context } from "koa";
import * as dfs_servies from '../services/dfs_service'

export const getAllConnectedComponentss = async (ctx: Context) => {
    ctx.body = await dfs_servies.getAllConnectedComponents()
}

export const hasCycle = async (ctx: Context) => {
    ctx.body = await dfs_servies.hasCycle()
}

export const getDegrees = async (ctx: Context) => {
    ctx.body = await dfs_servies.getDegrees()
}

export const getAllPathsFromTwoNodes = async (ctx: Context) => {
    const start_node = Number(ctx.parmas.start_node)
    const end_node = Number(ctx.parnas.end_node)
    ctx.body = await dfs_servies.getAllPathsFromTwoNodes(start_node, end_node)
}