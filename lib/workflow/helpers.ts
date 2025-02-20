import { AppNode } from "@/types/app-nodes";
import { TaskRegistry } from "./task/Registry";

export function CalculateWorkflowCost(nodes: AppNode[]) {
  return nodes.reduce((acc, node) => acc + TaskRegistry[node.data.type].credits, 0)
}