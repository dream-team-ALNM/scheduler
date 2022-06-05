import lodash from 'lodash';
import { IAverageExperimentResult, IExperiment } from '../interfaces';

const getAverageExperimentResult = (
  results: IExperiment[],
  taskSize: number
): IAverageExperimentResult => {
  const getPartialResult = (fieldName: string) => {
    if (results.some((result) => !lodash.isUndefined(result[fieldName]))) {
      return (
        (results
          .filter((result) => !!result[fieldName])
          .map((result) => result[fieldName])
          .reduce((a, b) => (a as number) + (b as number), 0) as number) /
        taskSize
      );
    }
  };

  return {
    taskSize,
    averageExecutionTimeGreedyAlgorithm: getPartialResult(
      'executionTimeGreedyAlgorithm'
    ),
    averageAccuracyGreedyAlgorithm: getPartialResult('accuracyGreedyAlgorithm'),
    averageExecutionTimeBranchAndBoundAlgorithm: getPartialResult(
      'executionTimeBranchAndBoundAlgorithm'
    ),
    averageAccuracyBranchAndBoundAlgorithm: getPartialResult(
      'accuracyBranchAndBoundAlgorithm'
    ),
    averageExecutionTimeHillClimbingAlgorithm: getPartialResult(
      'executionTimeHillClimbingAlgorithm'
    ),
    averageAccuracyHillClimbingAlgorithm: getPartialResult(
      'accuracyHillClimbingAlgorithm'
    ),
  };
};

export { getAverageExperimentResult };
