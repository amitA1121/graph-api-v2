import { Context, Next } from 'koa'
import { statusCode } from '../utils/statusCode'

export const parseNumberParams = (paramsNames: string[]) => {
    return async (ctx: Context, next: Next) => {
        const validatedParams = ctx.state.validatedParams as Record<string, unknown>
        
        const parsedParams: Record<string, number> = {}

        for (const paramsName of paramsNames) {
            const value = validatedParams[paramsName]
            const parsedValue = Number(value)

            if(Number.isNaN(parsedValue)) {
                ctx.status = statusCode.BAD_REQUEST
                ctx.body = {error: `${paramsName} need to be number`}
                return
            }
            parsedParams[paramsName] = parsedValue
        }
        ctx.state.validatedParams = {
            ...validatedParams,
            ...parsedParams,
        }
        await next()
    }
}