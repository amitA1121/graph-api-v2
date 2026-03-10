import {Codec, string} from 'purify-ts'

export interface Edge {
    source_node_id : number;
    target_node_id : number;
 }

export const EdgeParamsCodec = Codec.interface({
    node_a_id: string,
    node_b_id: string,
})
