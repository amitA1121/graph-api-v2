import { Edge } from '../models/edge_model'
import { NODE_ID_TYPE } from '../utils/graph_typs'
import { EDGE_TABLE_NAME, COLUMN_NAMES_a, COLUMN_NAMES_b } from "../db/db_configs"

import { db } from '../db/database'


const orderEdgeBySize = (a: NODE_ID_TYPE, b: NODE_ID_TYPE) => ({
    node_a_id: Math.min(a,b),
    node_b_id: Math.max(a,b),
})

export const getAllEdges = async (): Promise<Edge[]> => {
    return await db<Edge>(EDGE_TABLE_NAME).select('*')
}

export const checkEdgeBetweenTwoNodes = async (a: NODE_ID_TYPE, b: NODE_ID_TYPE): Promise<Edge | undefined> => {
    const {node_a_id, node_b_id} = orderEdgeBySize(a,b)
    return await db<Edge>(EDGE_TABLE_NAME).where({node_a_id, node_b_id}).first()
}

export const createEdge = async (a: NODE_ID_TYPE, b: NODE_ID_TYPE): Promise<Edge> => {
    const ordersNODEs = orderEdgeBySize(a, b)
    const [newEdge] = await db<Edge>(EDGE_TABLE_NAME).insert(ordersNODEs).returning('*')
    return newEdge
}

export const deleteEdge = async (a: NODE_ID_TYPE, b: NODE_ID_TYPE): Promise<void> => {
    const {node_a_id, node_b_id} = orderEdgeBySize(a,b)
    await db(EDGE_TABLE_NAME).where({node_a_id, node_b_id}).delete()
}

export const getNeighborsOfNode = async (id: NODE_ID_TYPE): Promise<NODE_ID_TYPE[]> => {
    const edges = await db<Edge>(EDGE_TABLE_NAME).where(COLUMN_NAMES_a, id).orWhere(COLUMN_NAMES_b, id)
    return edges.map(edge => 
        edge.node_a_id === id ? edge.node_b_id : edge.node_a_id
    )
}
