import { NODE_ID_TYPE } from '../utils/graph_typs'
import { buildAdjacencyList } from './edge_service'
import { assertNodeExist } from './helpers/helpert_logics'

type AdjacencyList = Map<NODE_ID_TYPE, NODE_ID_TYPE[]>

export const getDegrees = async () => {
    const adjacencyList = await buildAdjacencyList()
    const result = []
    for(const [node_id, neighbors] of adjacencyList) {
        result.push({node_id, degree: neighbors.length})
    }
    return result
}

export const getAllConnectedComponents = async () => {
    
    const adjacencyList = await buildAdjacencyList()
    const components: NODE_ID_TYPE[][] = []
    const visitedNodes = new Set<NODE_ID_TYPE>()

    const dfsExplore = (node_id: NODE_ID_TYPE, component: NODE_ID_TYPE[]) => {
        visitedNodes.add(node_id)
        component.push(node_id)
        for (const neighbor of adjacencyList.get(node_id)!) {
            if (!visitedNodes.has(neighbor)) {
                dfsExplore(neighbor, component)
            }
        }
    }

    for(const node_id of adjacencyList.keys()) {
        if(!visitedNodes.has(node_id)) {
            const component: NODE_ID_TYPE[] = []
            dfsExplore(node_id, component)
            components.push(component)
        }
    }
    return components
}

export const getAllPathsFromTwoNodes = async (source_node_id: NODE_ID_TYPE, target_node_id: NODE_ID_TYPE ) => {

    await assertNodeExist(source_node_id)
    await assertNodeExist(target_node_id)
    
    const adjacencyList = await buildAdjacencyList()
    const allPaths: NODE_ID_TYPE[][] = []
    const path: NODE_ID_TYPE[] = [source_node_id]
    const visitedNodes = new Set<NODE_ID_TYPE>([source_node_id])

    const dfs = (current_node: NODE_ID_TYPE) => {
        if(current_node === target_node_id) {
            allPaths.push([...path])
            return
        }

        for (const neighbor of adjacencyList.get(current_node) || []) {
            if (!visitedNodes.has(neighbor)) {
                path.push(neighbor)
                visitedNodes.add(neighbor)

                dfs(neighbor)

                path.pop()
                visitedNodes.delete(neighbor)
            }
        }       
    }
    dfs(source_node_id)
    return allPaths
}

export const hasCycle = async (): Promise<boolean> => {
    const adjacencyList = await buildAdjacencyList()
    const visited = new Set<NODE_ID_TYPE>()

    const dfs = (current_node: NODE_ID_TYPE, parent: NODE_ID_TYPE): boolean => {
        visited.add(current_node)

        for (const neighbor of adjacencyList.get(current_node)!) {
            if (!visited.has(neighbor)) {
                if (dfs(neighbor, current_node)) return true
            } else if (neighbor !== parent) {
                return true
            }
        }
        return false
    }

    for (const node_id of adjacencyList.keys()) {
        if (!visited.has(node_id)) {
            if (dfs(node_id, -1)) return true
        }
    }
    return false
}