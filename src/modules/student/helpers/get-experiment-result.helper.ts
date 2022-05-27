import { IJob } from '../../shared/interfaces';
import { Result } from '../../shared/types';
import { IExperimentResult } from '../interfaces';

const getExperimentResult = (
  task: IJob[],
  callback: (jobs: IJob[]) => Result<IJob>,
  optimalZmax: number
): IExperimentResult => {
  const startTime = new Date().getTime();
  const { Zmax } = callback(task);
  const endTime = new Date().getTime();
  const timeDiff = (endTime - startTime) / 60000;
  const accuracy = Math.abs(Zmax - optimalZmax);
  return {
    timeDiff,
    accuracy,
  };
};

export { getExperimentResult };
