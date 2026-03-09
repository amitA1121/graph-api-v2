import {Codec, string, GetType} from 'purify-ts'

export interface Edge {
    node_a_id : number;
    node_b_id : number;
 }

export const EdgeParamsCodec = Codec.interface({
    node_a_id: string,
    node_b_id: string,
})
