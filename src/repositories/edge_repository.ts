import { NODE_ID_TYPE } from '../utils/graph_typs'
import { DBConstants } from "../db/db_configs"

import { db } from '../db/database'

type OrderedEdge = {
    source_node_id: NODE_ID_TYPE
    target_node_id: NODE_ID_TYPE
}

// this is my mapper
const toOrderedEdge = (firstNodeId: NODE_ID_TYPE, secondNodeId: NODE_ID_TYPE): OrderedEdge => ({
    source_node_id: Math.min(firstNodeId, secondNodeId),
    target_node_id: Math.max(firstNodeId, secondNodeId)
})

export const getAllEdges = async (): Promise<OrderedEdge[]> => {
    return await db<OrderedEdge>(DBConstants.TABLES.EDGES).select('*')
}

export const getEdgeBetweenNodes = async (firstNodeId: NODE_ID_TYPE, secondNodeId: NODE_ID_TYPE): Promise<OrderedEdge | undefined> => {
    const orderedEdge = toOrderedEdge(firstNodeId, secondNodeId)
    return await db<OrderedEdge>(DBConstants.TABLES.EDGES).where(orderedEdge).first()
}

export const createEdge = async (firstNodeId: NODE_ID_TYPE, secondNodeId: NODE_ID_TYPE): Promise<OrderedEdge> => {
    const orderedEdge = toOrderedEdge(firstNodeId, secondNodeId)
    const [newEdge] = await db<OrderedEdge>(DBConstants.TABLES.EDGES).insert(orderedEdge).returning('*')
    return newEdge
}

export const deleteEdge = async (firstNodeId: NODE_ID_TYPE, secondNodeId: NODE_ID_TYPE): Promise<void> => {
    const orderedEdge = toOrderedEdge(firstNodeId, secondNodeId)
    await db(DBConstants.TABLES.EDGES).where(orderedEdge).delete()
}

export const getNeighborsOfNode = async (id: NODE_ID_TYPE): Promise<NODE_ID_TYPE[]> => {
    const edges = await db<OrderedEdge>(DBConstants.TABLES.EDGES)
    .where(DBConstants.COLUMNS.SOURCE_NODE_ID, id)
    .orWhere(DBConstants.COLUMNS.TARGET_NODE_ID, id)
    
    return edges.map(edge => 
        edge.source_node_id === id ? edge.target_node_id : edge.source_node_id
    )
}