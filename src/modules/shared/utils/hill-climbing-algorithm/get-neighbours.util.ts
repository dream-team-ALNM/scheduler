import { IJob } from '../../interfaces';

const getNeighbours = <T extends IJob>(schedule: T[]): T[][] => {
  const neighbours = [] as T[][];
  for (let i = 0; i < schedule.length; i++) {
    for (let j = i + 1; j < schedule.length; j++) {
      const neighbour = [...schedule];
      neighbour[i] = schedule[j];
      neighbour[j] = schedule[i];
      neighbours.push(neighbour);
    }
  }
  return neighbours;
};

export { getNeighbours };
