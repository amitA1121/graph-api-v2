import {Codec, number, GetType} from 'purify-ts'

export interface Node {
    id : number;
}

export const NodeParamsCodec = Codec.interface({
    id : number
})

export type NodeParams = GetType<typeof NodeParamsCodec>