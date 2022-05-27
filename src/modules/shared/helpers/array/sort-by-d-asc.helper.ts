import { IJob } from '../../interfaces';

const sortBydAsc = <T extends IJob>(job1: T, job2: T): number => {
  return job1.d - job2.d;
};

export { sortBydAsc };
