import {Codec, string} from 'purify-ts'

export const PathParamsCodec = Codec.interface({
    start : string,
    end : string,
 })