import { Context, Next } from 'koa'
import { statusCode } from '../utils/statusCode'
export class AppError extends Error {
    statusCode: number
    
    constructor(message: string, statusCode: number) {
        super(message)
        this.statusCode = statusCode
    }
}

export const errorHandler = async (ctx: Context, next: Next) => {
    try {
        await next()
    } catch (err) {
        console.log(err)
        if (err instanceof AppError) {
            ctx.status = err.statusCode
            ctx.body = { success: false, error: err.message }
            } else {
            ctx.status = statusCode.INTERNAL_SERVER_ERROR
            ctx.body = { success: false, error: 'server error' }
        }
    }
}