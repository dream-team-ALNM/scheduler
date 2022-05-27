import { IJob, INode } from '../../interfaces';

const getZmax = <T extends IJob>(node: INode<T>): number => {
  if (!node.parent) return 0;
  return Math.max(node.Z as number, getZmax(node.parent));
};

export { getZmax };
