import { sortByZmaxAsc } from '../../helpers/array';
import { IJob } from '../../interfaces';
import { getNeighbours } from './get-neighbours.util';

const getBestNeighbour = <T extends IJob>(schedule: T[]): T[] => {
  const neighbours = getNeighbours(schedule);
  return neighbours.sort(sortByZmaxAsc).shift() as T[];
};

export { getBestNeighbour };
