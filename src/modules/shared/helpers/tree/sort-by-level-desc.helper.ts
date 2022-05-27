import { IJob, INode } from '../../interfaces';

const sortByLevelDesc = <T extends IJob>(
  node1: INode<T>,
  node2: INode<T>
): number => {
  return node2.level - node1.level;
};


export { sortByLevelDesc };
