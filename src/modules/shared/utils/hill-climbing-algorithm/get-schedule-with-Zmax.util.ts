import { getZmax } from "../../helpers/array";
import { IJob } from "../../interfaces";
import { getBestNeighbour } from "./get-best-neighbour.util";

const getScheduleWithMinZmax = <T extends IJob>(schedule: T[]): T[] => {
  const bestNeighbour = getBestNeighbour(schedule);
  if (getZmax(schedule) <= getZmax(bestNeighbour))
    return schedule;
  return getScheduleWithMinZmax(bestNeighbour);
};

export { getScheduleWithMinZmax };
