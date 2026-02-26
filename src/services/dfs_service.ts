import { buildAdjacencyList } from '../services/graph_service'


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
    const components: number[][] = []
    const visitedNodes = new Set<number>()

    const dfsExplore = (node_id: number, component: number[]) => {
        visitedNodes.add(node_id)
        component.push(node_id)
        for (const neighbor of adjacencyList.get(node_id)!) {
            if (!visitedNodes.has(neighbor)) {
                dfsExplore(neighbor, component)
            }
        }
        return components
    }

    for(const node_id of adjacencyList.keys() ) {
        if(!visitedNodes.has(node_id)) {
            const component: number[] = []
            dfsExplore(node_id, component)
            components.push(component)
        }
    }
}
//-----------------------------------------------------------------------------------
// change the type of node to "number" to globalic variable like "Node_type: number"
//-----------------------------------------------------------------------------------
export const getAllPathsFromTwoNodes = async (start_node: number, end_node: number ) => {
    const adjacencyList = await buildAdjacencyList()
    const allPath: number[][] = []
    const path: number[] = [start_node]
    const visitedNodes = new Set<number>([start_node])

    const dfs = (current_node: number) => {
        if(current_node === end_node) {
            allPath.push([...path])
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
    dfs(start_node)
    return allPath
}

export const hasCycle = async (): Promise<boolean> => {
    const adjacencyList = await buildAdjacencyList()
    const visited = new Set<number>()

    const dfs = (current: number, parent: number): boolean => {
        visited.add(current)

        for (const neighbor of adjacencyList.get(current)!) {
            if (!visited.has(neighbor)) {
                if (dfs(neighbor, current)) return true
            } else if (neighbor !== parent) {
                return true
            }
        }
        return false
    }

    for (const nodeId of adjacencyList.keys()) {
        if (!visited.has(nodeId)) {
            if (dfs(nodeId, -1)) return true
        }
    }
    return false
}