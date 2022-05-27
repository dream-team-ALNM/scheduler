import { ICriterion, IJob } from '../../interfaces';

const getZmax = <T extends IJob>(scheduledJobs: T[]): number => {
  const jobsWithCriterions = [] as (T & ICriterion)[];
  for (let i = 0; i < scheduledJobs?.length; i++) {
    const Tprev = i === 0 ? 0 : (jobsWithCriterions[i - 1].T as number);
    const { d, t, r } = scheduledJobs[i];
    const T = Tprev + t + Math.max(0, r - Tprev);
    const Z = Math.max(0, T - d);
    jobsWithCriterions.push({ ...scheduledJobs[i], Z, T });
  }
  return jobsWithCriterions
    .map((job) => job.Z)
    .sort()
    .pop() as number;
};

export { getZmax };
