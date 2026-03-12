import { Context } from 'koa'
import * as dfsService from '../services/dfs_service'

type ParsedPathParams = {
    start: number,
    end: number
}

//FIX: statuses all across
export const getAllConnectedComponents = async (ctx: Context) => {
    ctx.body = await dfsService.getAllConnectedComponents()
}

export const hasCycle = async (ctx: Context) => {
    ctx.body = await dfsService.hasCycle()
}

export const getDegrees = async (ctx: Context) => {
    ctx.body = await dfsService.getDegrees()
}

export const getAllPathsFromTwoNodes = async (ctx: Context) => {
    const { start, end } = ctx.state.validatedParams as ParsedPathParams

    ctx.body = await dfsService.getAllPathsFromTwoNodes(start, end)
}