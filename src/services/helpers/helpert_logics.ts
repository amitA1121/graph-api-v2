import { NODE_ID_TYPE } from '../../utils/graph_typs';
import * as nodeRepo from '../../repositories/node_repository'
import * as edgeRepo from  '../../repositories/edge_repository'
import { AppError } from '../../middleware/errorHandler';
import { statusCode } from '../../utils/statusCode';

//FIX: Domain logic!

export const assertNodeExist = async (id: NODE_ID_TYPE): Promise<void> => {
    const isNodeExist = await nodeRepo.getNodeById(id)

    if(!isNodeExist) {
        throw new AppError('node not found',statusCode.NOT_FOUND, "NODE NOT FOUND")
    }
}

export const assertEdgeExist = async (source_node_id: NODE_ID_TYPE, target_node_id: NODE_ID_TYPE): Promise<void> => {
    const isEdgeExist = await edgeRepo.getEdgeBetweenNodes(source_node_id, target_node_id)

        if(!isEdgeExist)
            throw new AppError('edge not found', statusCode.NOT_FOUND, 'EDGE NODT FOUND')
}

export const assertNodesAreDifferent = (source_node_id: NODE_ID_TYPE, target_node_id: NODE_ID_TYPE): void => {
    if(source_node_id === target_node_id)
        throw new AppError('edge cannot connect a node to himself',statusCode.BAD_REQUEST, "SELF LOOP NOT ALLOWED")
}

export const assertEdgeDoesNotExist = async (source_node_id: NODE_ID_TYPE, target_node_id: NODE_ID_TYPE): Promise<void> => {
    const edge = await edgeRepo.getEdgeBetweenNodes(source_node_id, target_node_id)

    if(edge) {
        throw new AppError('edge already existing', statusCode.CONFLICT, 'EDGE ALREADY EXISTING')
    }
}