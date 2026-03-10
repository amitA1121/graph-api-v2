import { Context, Next } from 'koa'
import { statusCode } from '../utils/statusCode'

export class AppError extends Error {
    statusCode: number
    type: string

    constructor(message: string, statusCode: number, type: string) {
        super(message)
        this.statusCode = statusCode
        this.type = type
    }
}

export const errorHandler = async (ctx: Context, next: Next) => {
    try {
        await next()
    }
    catch (err) {
        console.error(err)
        if (err instanceof AppError) {
            ctx.status = err.statusCode
            ctx.body = { success: false, error: err.message }
            }
            else {
                ctx.status = statusCode.INTERNAL_SERVER_ERROR
                ctx.body = { success: false, error: 'server error' }
        }
    }
}