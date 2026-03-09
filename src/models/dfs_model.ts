import {Codec, string, GetType} from 'purify-ts'

export const PathParamsCodec = Codec.interface({
    start : string,
    end : string,
 })