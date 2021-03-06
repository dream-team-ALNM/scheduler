import { IJob, INode } from '../../interfaces';
import { getChildWithMinZmax } from './get-child-with-min-Zmax.util';

const getLastNode = <T extends IJob>(
  node: INode<T>,
  jobs: T[],
  exploredNodes: INode<T>[]
): INode<T> => {
  if (node.level === jobs.length) return node;
  const bestChild = getChildWithMinZmax(node, jobs, exploredNodes);
  return bestChild.level === jobs.length
    ? bestChild
    : getLastNode(bestChild, jobs, exploredNodes);
};

export { getLastNode };
