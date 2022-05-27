import { IJob, INode } from '../../interfaces';

const checkIsIncludedInPath = <T extends IJob>(node: INode<T>, i: number): boolean => {
  if (!node.parent) return false;
  return node.data?.i === i || checkIsIncludedInPath(node.parent, i);
};

export { checkIsIncludedInPath };
