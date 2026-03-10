import { AppError } from '../middleware/errorHandler'
import * as nodeRepo from '../repositories/node_repository'
import * as edgeRepo from '../repositories/edge_repository'
import { statusCode } from '../utils/statusCode'
import { NODE_ID_TYPE } from '../utils/graph_typs'

export const getAllNodes = async () => {
    return nodeRepo.getAllNodes()
}

export const createNode = async () => {
    return nodeRepo.createNode()
}

export const deleteNode = async (id: NODE_ID_TYPE) => {
    const isNodeExist = await nodeRepo.getNodeContantById(id);
    if(!isNodeExist) throw new AppError('node not found',statusCode.NOT_FOUND, "NOT FOUND")
    return nodeRepo.deleteNode(id)
}