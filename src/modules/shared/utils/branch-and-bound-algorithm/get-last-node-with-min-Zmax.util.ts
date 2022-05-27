import { checkIsBetterExist, sortByLevelDesc } from '../../helpers/tree';
import { IJob, INode } from '../../interfaces';
import { getLastNode } from './get-last-node.util';

const getLastNodeWithMinZmax = <T extends IJob>(
  node: INode<T>,
  jobs: T[],
  exploredNodes: INode<T>[]
): INode<T> => {
  if (!exploredNodes.some(checkIsBetterExist(node))) return node;
  const betterNode = exploredNodes
    .filter(checkIsBetterExist(node))
    .sort(sortByLevelDesc)
    .pop();
  if (betterNode) {
    exploredNodes.splice(exploredNodes.indexOf(betterNode), 1);
    const lastNode = getLastNode(betterNode, jobs, exploredNodes);
    return getLastNodeWithMinZmax(lastNode, jobs, exploredNodes);
  }
  return node;
};

export { getLastNodeWithMinZmax };
