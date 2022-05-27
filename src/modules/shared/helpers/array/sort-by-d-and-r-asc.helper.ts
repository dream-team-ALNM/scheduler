import { IJob } from '../../interfaces';

const sortBydAndrAsc = <T extends IJob>(job1: T, job2: T): number => {
  const { d: d1, r: r1 } = job1;
  const { d: d2, r: r2 } = job2;
  return d1 === d2 ? r1 - r2 : d1 - d2;
};

export { sortBydAndrAsc };
