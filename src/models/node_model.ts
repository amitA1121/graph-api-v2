import {Codec, number, GetType} from 'purify-ts'

export interface Node {
    node_id : number;
}

export const NodeParamsCodec = Codec.interface({
    node_id : number
})