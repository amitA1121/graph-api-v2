import {Codec, number, GetType} from 'purify-ts'

export interface Edge {
    node_a_id : number;
    node_b_id : number;
 }

export const EdgeParamsCodec = Codec.interface({
    node_a_id : number,
    node_b_id : number,
 })

export type EdgeParams = GetType<typeof EdgeParamsCodec>
