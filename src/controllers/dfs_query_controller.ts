import { Context } from 'koa'
import * as dfs_service from '../services/dfs_service'

export const getAllConnectedComponents = async (ctx: Context) => {
    ctx.body = await dfs_service.getAllConnectedComponents()
}

export const hasCycle = async (ctx: Context) => {
    ctx.body = await dfs_service.hasCycle()
}

export const getDegrees = async (ctx: Context) => {
    ctx.body = await dfs_service.getDegrees()
}

export const getAllPathsFromTwoNodes = async (ctx: Context) => {
    const {start, end } = ctx.state.validatedParams as {
        start: number,
        end: number
    }

    ctx.body = await dfs_service.getAllPathsFromTwoNodes(start, end)
}