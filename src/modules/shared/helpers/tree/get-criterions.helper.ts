import { IJob, INode } from '../../interfaces';

const getCriterions = <T extends IJob>(node: INode<T>): INode<T> => {
  const { d, r, t } = node.data as IJob;
  const Tprev = node.parent?.T ?? 0;
  const T = Tprev + t + Math.max(0, r - Tprev);
  const Z = Math.max(0, T - d);
  return { ...node, T, Z };
};

export { getCriterions };
