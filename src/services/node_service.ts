import * as nodeRepo from '../repositories/node_repository'
import { NODE_ID_TYPE } from '../utils/graph_typs'
import * as helpert_logics from '../services/helpers/helpert_logics'

//FIX: its good practice to explicitly type the return type
export const getAllNodes = async () => {
    return nodeRepo.getAllNodes()
}

export const createNode = async () => {
    return nodeRepo.createNode()
}

export const deleteNode = async (node_id: NODE_ID_TYPE): Promise<void> => {
    await helpert_logics.assertNodeExist(node_id)
    await nodeRepo.deleteNode(node_id)
}