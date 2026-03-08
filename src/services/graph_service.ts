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
    if(!isNodeExist) throw new AppError('node not found',statusCode.NOT_FOUND)
    return nodeRepo.deleteNode(id)
}

export const createEdge = async (node_a_id : NODE_ID_TYPE, node_b_id: NODE_ID_TYPE) => {
    if(node_a_id === node_b_id)
        throw new AppError('edges cant be same',statusCode.BAD_REQUEST)

    const a_id = await nodeRepo.getNodeContantById(node_a_id)
    const b_id = await nodeRepo.getNodeContantById(node_b_id)

    if(!a_id) throw new AppError('node A not found',statusCode.NOT_FOUND)
    if(!b_id) throw new AppError('node B not found',statusCode.NOT_FOUND)
    
    const isEdgesExisting = await edgeRepo.checkEdgeBetweenTwoNodes(node_a_id, node_b_id)
    if(isEdgesExisting) throw new AppError('edge already existing', statusCode.CONFLICT)
    return edgeRepo.createEdge(node_a_id, node_b_id)
}

export const deleteEdge = async(node_a_id: NODE_ID_TYPE, node_b_id: NODE_ID_TYPE) => {
    const isEdgeExist = await edgeRepo.checkEdgeBetweenTwoNodes(node_a_id, node_b_id)
    if(!isEdgeExist) throw new AppError('edge does not exist',statusCode.NOT_FOUND)
    return edgeRepo.deleteEdge(node_a_id, node_b_id)
}

export const getAllEdgess = async () => {
    return edgeRepo.getAllEdges()
}

export const getNeighborsOfNode = async (id: NODE_ID_TYPE) => {
    const isNodeExist = await nodeRepo.getNodeContantById(id)
    if(!isNodeExist) throw new AppError('node not found',statusCode.NOT_FOUND)
    return edgeRepo.getNeighborsOfNode(id)
}

export const buildAdjacencyList = async (): Promise<Map<NODE_ID_TYPE, NODE_ID_TYPE[]>> => {
    const nodes = await nodeRepo.getAllNodes()
    const edges = await edgeRepo.getAllEdges()
    const adjacencyList = new Map<NODE_ID_TYPE, NODE_ID_TYPE[]>()

    for(const node of nodes) 
        adjacencyList.set(node.id, [])
    for(const edge of edges) {
        adjacencyList.get(edge.node_a_id)!.push(edge.node_b_id)
        adjacencyList.get(edge.node_b_id)!.push(edge.node_a_id)
    }
    return adjacencyList
}
