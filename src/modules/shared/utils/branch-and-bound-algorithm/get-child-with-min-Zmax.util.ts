import { sortByZmaxAsc } from '../../helpers/tree';
import { IJob, INode } from '../../interfaces';
import { getChildren } from './get-children.util';

const getChildWithMinZ = <T extends IJob>(node: INode<T>, jobs: T[], exploredNodes: INode<T>[]): INode<T> => {
  const [best, ...other] = getChildren(node, jobs).sort(sortByZmaxAsc);
  exploredNodes.push(...other);
  return best;
};

export { getChildWithMinZ };
