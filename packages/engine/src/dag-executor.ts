import type { DagNode, DagComputeInput, DagExecutionPlan, DagNodeResult } from './types.js';

export function buildExecutionPlan(nodes: DagNode[]): DagExecutionPlan {
  const nodeMap = new Map<string, DagNode>();
  const inDegree = new Map<string, number>();
  const adjacency = new Map<string, string[]>();

  for (const node of nodes) {
    nodeMap.set(node.id, node);
    inDegree.set(node.id, 0);
    adjacency.set(node.id, []);
  }

  for (const node of nodes) {
    for (const dep of node.dependencies) {
      if (!adjacency.has(dep)) continue;
      adjacency.get(dep)!.push(node.id);
      inDegree.set(node.id, (inDegree.get(node.id) ?? 0) + 1);
    }
  }

  const layers: string[][] = [];
  const queue: string[] = [];
  const visited = new Set<string>();

  for (const [id, degree] of inDegree) {
    if (degree === 0) {
      queue.push(id);
      visited.add(id);
    }
  }

  if (queue.length === 0 && nodes.length > 0) {
    throw new Error('DAG contains a cycle or has no root nodes');
  }

  while (queue.length > 0) {
    const currentLayer = [...queue];
    layers.push(currentLayer);
    queue.length = 0;

    for (const nodeId of currentLayer) {
      const neighbors = adjacency.get(nodeId) ?? [];
      for (const neighbor of neighbors) {
        if (visited.has(neighbor)) continue;
        const newDegree = (inDegree.get(neighbor) ?? 1) - 1;
        inDegree.set(neighbor, newDegree);
        if (newDegree === 0) {
          queue.push(neighbor);
          visited.add(neighbor);
        }
      }
    }
  }

  if (visited.size !== nodes.length) {
    throw new Error('DAG contains a cycle: topological sort incomplete');
  }

  return { layers, nodeMap };
}

export async function executeDag(
  plan: DagExecutionPlan,
  input: DagComputeInput,
): Promise<Map<string, DagNodeResult>> {
  const results = new Map<string, DagNodeResult>();

  for (const layer of plan.layers) {
    const layerPromises = layer.map(async (nodeId) => {
      const node = plan.nodeMap.get(nodeId);
      if (!node) throw new Error(`Node ${nodeId} not found in execution plan`);

      const nodeInput: DagComputeInput = {
        ...input,
        computedValues: results,
      };

      const result = await node.execute(nodeInput);
      return { nodeId, result };
    });

    const layerResults = await Promise.all(layerPromises);
    for (const { nodeId, result } of layerResults) {
      results.set(nodeId, result);
    }
  }

  return results;
}

export function buildAndExecuteDag(
  nodes: DagNode[],
  input: DagComputeInput,
): Promise<Map<string, DagNodeResult>> {
  const plan = buildExecutionPlan(nodes);
  return executeDag(plan, input);
}
