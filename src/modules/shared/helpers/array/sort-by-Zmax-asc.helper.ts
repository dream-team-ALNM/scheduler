import { IJob } from '../../interfaces';
import { getZmax } from './get-Zmax.helper';

const sortByZmaxAsc = <T extends IJob>(
  schedule1: T[],
  schedule2: T[]
): number => {
  return getZmax(schedule1) - getZmax(schedule2);
};


export { sortByZmaxAsc };
