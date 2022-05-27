import { checkIsIncludedInPath, getCriterions } from "../../helpers/tree";
import { IJob, INode } from "../../interfaces";

const getChildren = <T extends IJob>(node: INode<T>, jobs: T[]): INode<T>[] => {
  const children = [] as INode<T>[];
  for (const job of jobs) {
    const isIncluded = checkIsIncludedInPath(node, job.i);
    if (isIncluded) continue;
    const child = { data: job, parent: node, level: node.level + 1 };
    children.push(getCriterions(child));
  }
  return children;
};

export {getChildren}