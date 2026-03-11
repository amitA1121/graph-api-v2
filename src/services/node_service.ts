import * as nodeRepo from '../repositories/node_repository'
import { NODE_ID_TYPE } from '../utils/graph_typs'
import * as helpert_logics from '../services/helpers/helpert_logics'


export const getAllNodes = async () => {
    return nodeRepo.getAllNodes()
}

export const createNode = async () => {
    return nodeRepo.createNode()
}

export const deleteNode = async (id: NODE_ID_TYPE) => {
    helpert_logics.assertNodeExist(id)
    
    nodeRepo.deleteNode(id)
}