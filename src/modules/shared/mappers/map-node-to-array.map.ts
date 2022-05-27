import { IJob, INode } from "../interfaces";

const mapNodeToArray = <T extends IJob>(node: INode<T>): T[] => {
  const iterate = (currentNode: INode<T>, acc: T[]): T[] => {
    if (!currentNode.parent) return acc;
    return iterate(currentNode.parent, [...acc, currentNode.data as T]);
  };
  return iterate(node, []).reverse();
};

export { mapNodeToArray };
