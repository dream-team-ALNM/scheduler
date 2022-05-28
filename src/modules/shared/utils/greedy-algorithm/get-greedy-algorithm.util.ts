import { getZmax } from '../../helpers/array';
import { IJob } from '../../interfaces';
import { Result } from '../../types';

const getGreedyAlgorithm =
  <T extends IJob>(sortJobsFnc: (job1: T, job2: T) => number) =>
  (jobs: T[]): Result<T> => {
    const scheduledJobs = [...jobs].sort(sortJobsFnc);
    return { scheduledJobs, Zmax: getZmax(scheduledJobs) };
  };

export { getGreedyAlgorithm };
