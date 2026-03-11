import {Codec, string} from 'purify-ts'

export const EdgeParamsCodec = Codec.interface({
    source_node_id: string,
    target_node_id: string,
})
