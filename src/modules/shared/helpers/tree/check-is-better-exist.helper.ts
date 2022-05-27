import { IJob, INode } from '../../interfaces';
import { getZmax } from './get-Zmax.helper';

const checkIsBetterExist =
  <T extends IJob>(currentNode: INode<T>) =>
  (node: INode<T>) => {
    return getZmax(currentNode) > getZmax(node);
  };


export { checkIsBetterExist };
