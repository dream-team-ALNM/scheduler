import { IJob, INode } from '../../interfaces';
import { getZmax } from './get-Zmax.helper';

const sortByZmaxAsc = <T extends IJob>(
  node1: INode<T>,
  node2: INode<T>
): number => {
  return getZmax(node1) - getZmax(node2)
};


export { sortByZmaxAsc };
