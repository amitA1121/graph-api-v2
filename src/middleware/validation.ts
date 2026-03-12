import { Context, Next } from 'koa'
import { Codec } from 'purify-ts'
import { statusCode } from '../utils/statusCode'

export const validateParams = <T>(codec: Codec<T>) => {
    return async (ctx: Context, next: Next) => {
        const result = codec.decode(ctx.params)

        return result.caseOf({
            Left: (err) => {
                ctx.status = statusCode.BAD_REQUEST
                ctx.body = {error: err}
            },
            Right: async(data) => {
                //FIX: why duplicate the params inside ctx.state.validateedParams when they are already in ctx.params?
                ctx.state.validatedParams = data
                await next()
            }
        })
    }
} 