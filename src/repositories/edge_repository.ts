import { Edge } from '../models/edge_model'
import { NODE_ID_TYPE } from '../utils/graph_typs'
import { DBConstants } from "../db/db_configs"

import { db } from '../db/database'


const orderEdgeBySize = (a: NODE_ID_TYPE, b: NODE_ID_TYPE) => ({
    source_node_id: Math.min(a,b),
    target_node_id: Math.max(a,b),
})

export const getAllEdges = async (): Promise<Edge[]> => {
    return await db<Edge>(DBConstants.TABLES.EDGES).select('*')
}

export const checkEdgeBetweenTwoNodes = async (a: NODE_ID_TYPE, b: NODE_ID_TYPE): Promise<Edge | undefined> => {
    const {source_node_id, target_node_id} = orderEdgeBySize(a,b)
    return await db<Edge>(DBConstants.TABLES.EDGES).where({source_node_id, target_node_id}).first()
}

export const createEdge = async (a: NODE_ID_TYPE, b: NODE_ID_TYPE): Promise<Edge> => {
    const orderedNodes = orderEdgeBySize(a, b)
    const [newEdge] = await db<Edge>(DBConstants.TABLES.EDGES).insert(orderedNodes).returning('*')
    return newEdge
}

export const deleteEdge = async (a: NODE_ID_TYPE, b: NODE_ID_TYPE): Promise<void> => {
    const {source_node_id, target_node_id} = orderEdgeBySize(a,b)
    await db(DBConstants.TABLES.EDGES).where({source_node_id, target_node_id}).delete()
}

export const getNeighborsOfNode = async (id: NODE_ID_TYPE): Promise<NODE_ID_TYPE[]> => {
    const edges = await db<Edge>(DBConstants.TABLES.EDGES).where(DBConstants.COLUMNS.SOURCE_NODE_ID, id).orWhere(DBConstants.COLUMNS.TARGET_NODE_ID, id)
    return edges.map(edge => 
        edge.source_node_id === id ? edge.target_node_id : edge.source_node_id
    )
}
