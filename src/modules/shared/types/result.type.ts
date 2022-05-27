import { IJob } from '../interfaces';

type Result<T extends IJob> = {
  scheduledJobs: T[];
  Zmax: number;
};

export type { Result };
