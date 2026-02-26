import {Codec, number, GetType} from 'purify-ts'

export interface Edge {
    node_a_id : number;
    node_b_id : number;
 }

export const EdgeBodyInput = Codec.interface({
    node_a_id : number,
    node_b_id : number,
 })

export type EdgeBodyInput = GetType<typeof EdgeBodyInput>
