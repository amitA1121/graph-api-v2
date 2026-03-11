import {Codec, string} from 'purify-ts'

export const NodeParamsCodec = Codec.interface({
    node_id : string
})