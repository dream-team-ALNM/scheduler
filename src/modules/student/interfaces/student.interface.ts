import { IJob } from "../../shared/interfaces";

interface IStudent extends IJob {
  fullName: string;
}

export type { IStudent };
