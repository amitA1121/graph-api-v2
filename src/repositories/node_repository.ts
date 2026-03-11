import { db } from '../db/database'
import { Node } from '../models/node_model';
import {NODE_ID_TYPE} from '../utils/graph_typs'
import { DBConstants } from '../db/db_configs'


export const getAllNodes = async (): Promise<Node[]> => {
    return db<Node>(DBConstants.TABLES.NODES).select('*')
}

export const getNodeById = async (node_id: NODE_ID_TYPE): Promise<Node | undefined> => {
    return db<Node>(DBConstants.TABLES.NODES).where({ node_id }).first()
}

export const createNode = async (): Promise<Node> => {
    const [newNode] = await db<Node>(DBConstants.TABLES.NODES).insert({}).returning('*')
    return newNode
}

export const deleteNode = async (node_id: NODE_ID_TYPE): Promise<void> => {
    await db(DBConstants.TABLES.NODES).where({ node_id }).delete()
}