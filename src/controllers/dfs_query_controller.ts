import { Context } from "koa";
import * as dfs_serviec from '../services/dfs_service'
import { PathParamsCodec } from '../models/dfs_model'
import { statusCode } from "../utils/statusCode";

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
    const result = PathParamsCodec.decode(ctx.params)
    result.caseOf({
        Left(err) {
            ctx.status = statusCode.BAD_REQUEST
            ctx.body = {error: err}
        },
        Right: async(data) => {
            ctx.status = statusCode.OK
            ctx.body = await dfs_serviec.getAllPathsFromTwoNodes(data.start, data.end)
        }
    })
}