import { db } from '../db/database'
import { Node } from '../models/node_model';
import {NODE_ID_TYPE} from '../utils/graph_typs'
import { NODE_TABLE_NAME } from "../db/db_configs"
export const getAllNodes = async (): Promise<Node[]> => {
    return db<Node>('nodes').select('*')
}

export const getNodeContantById = async (id: NODE_ID_TYPE): Promise<Node | undefined> => {
    return db<Node>(NODE_TABLE_NAME).where({id}).first()
}

export const createNode = async (): Promise<Node> => {
    const [newNode] = await db<Node>(NODE_TABLE_NAME).insert({}).returning('*')
    return newNode
}

export const deleteNode = async (id: NODE_ID_TYPE): Promise<void> => {
    await db(NODE_TABLE_NAME).where({id}).delete()
} 