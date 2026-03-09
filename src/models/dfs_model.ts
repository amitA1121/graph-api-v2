import {Codec, number, GetType} from 'purify-ts'

export const PathParamsCodec = Codec.interface({
    start : number,
    end : number,
 })

export type EdgeParams = GetType<typeof PathParamsCodec>