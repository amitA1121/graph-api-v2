import * as nodeRepo from '../repositories/node_repository'
import * as edgeRepo from '../repositories/edge_repository'
import { NODE_ID_TYPE } from '../utils/graph_typs'
import * as helpert_logics from '../services/helpers/helpert_logics'

//FIX: This is DOMAIN!!
type AdjacencyList = Map<NODE_ID_TYPE, NODE_ID_TYPE[]>

//FIX: please add return types for all functions, it is good practice + it will reveal some thing pretty cool

export const createEdge = async (source_node_id : NODE_ID_TYPE, target_node_id: NODE_ID_TYPE) => {
    helpert_logics.assertNodesAreDifferent(source_node_id, target_node_id)
    await helpert_logics.assertNodeExist(source_node_id)
    await helpert_logics.assertNodeExist(target_node_id)
    await helpert_logics.assertEdgeDoesNotExist(source_node_id, target_node_id)

    return edgeRepo.createEdge(source_node_id, target_node_id)
}

export const deleteEdge = async(source_node_id: NODE_ID_TYPE, target_node_id: NODE_ID_TYPE) => {
    await helpert_logics.assertEdgeExist(source_node_id, target_node_id)

    return edgeRepo.deleteEdge(source_node_id, target_node_id)
}

export const getAllEdges = async () => {
    return edgeRepo.getAllEdges()
}

//FIX: who uses this?
export const getNeighborsOfNode = async (node_id: NODE_ID_TYPE) => {
    await helpert_logics.assertNodeExist(node_id)
    return edgeRepo.getNeighborsOfNode(node_id)
}

export const buildAdjacencyList = async (): Promise<AdjacencyList> => {
    const nodes = await nodeRepo.getAllNodes()
    const edges = await edgeRepo.getAllEdges()
    const adjacencyList: AdjacencyList = new Map()

    for(const node of nodes) 
        adjacencyList.set(node.node_id, [])
    for(const edge of edges) {
        adjacencyList.get(edge.source_node_id)!.push(edge.target_node_id)
        adjacencyList.get(edge.target_node_id)!.push(edge.source_node_id)
    }
    return adjacencyList
}
