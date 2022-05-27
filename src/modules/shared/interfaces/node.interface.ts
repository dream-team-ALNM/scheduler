import { ICriterion } from "./criterion.interface";
import { IJob } from "./job.interface";

interface INode<T extends IJob> extends ICriterion {
  data: T | null;
  parent: INode<T> | null;
  level: number;
}

export type { INode };
