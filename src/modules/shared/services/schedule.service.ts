import {
  sortBydAndrAsc,
  sortBydAsc,
  getZmax,
  getPermutation,
} from '../helpers/array';
import { IJob, INode } from '../interfaces';
import { mapNodeToArray } from '../mappers';
import { Result } from '../types';
import {
  getGreedyAlgorithm,
  getLastNode,
  getLastNodeWithMinZmax,
  getScheduleWithMinZmax,
} from '../utils';

class ScheduleService {
  public applyGreedyAlgorithm<T extends IJob>(jobs: T[]): Result<T> {
    return getGreedyAlgorithm<T>(sortBydAndrAsc)(jobs);
  }

  public applyBranchAndBoundAlgorithm<T extends IJob>(jobs: T[]): Result<T> {
    const rootNode = {
      data: null,
      parent: null,
      level: 0,
    } as INode<T>;
    const exploredNodes = [] as INode<T>[];
    const currentLastNode = getLastNode(rootNode, jobs, exploredNodes);
    const nodeWithMinZmax = getLastNodeWithMinZmax(
      currentLastNode,
      jobs,
      exploredNodes
    );

    const scheduledJobs = mapNodeToArray(nodeWithMinZmax);
    return {
      scheduledJobs,
      Zmax: getZmax(scheduledJobs),
    };
  }

  public applyHillClimbingAlgorithm<T extends IJob>(jobs: T[]): Result<T> {
    const { scheduledJobs: currentSchedule } =
      getGreedyAlgorithm(sortBydAsc)(jobs);

    const scheduleWithMinZmax = getScheduleWithMinZmax(currentSchedule);
    return {
      scheduledJobs: scheduleWithMinZmax,
      Zmax: getZmax(scheduleWithMinZmax),
    };
  }

  public getZmaxViaBruteForceSearchAlgorithm<T extends IJob>(
    jobs: T[]
  ): number {
    return getPermutation(jobs, jobs.length)
      .map((permutation) => getZmax(permutation))
      .sort((a, b) => b - a)
      .pop() as number;
  }
}

const scheduleService = new ScheduleService();

export { scheduleService };
