import {Codec, string} from 'purify-ts'

export interface Edge {
    sourrc_node_id : number;
    second_node_id : number;
 }

export const EdgeParamsCodec = Codec.interface({
    source_node_id: string,
    target_node_id: string,
})
