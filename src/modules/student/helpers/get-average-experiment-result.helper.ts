import { IAverageExperimentResult, IExperiment } from '../interfaces';

const getAverageExperimentResult = (
  results: IExperiment[],
  taskSize: number
): IAverageExperimentResult => {
  const nSizeResults = results.filter((result) => result.taskSize === taskSize);
  const averageExecutionTimeGreedyAlgorithm =
    results
      .map(({ executionTimeGreedyAlgorithm }) => executionTimeGreedyAlgorithm)
      .reduce((a, b) => a + b, 0) / nSizeResults.length;
  const averageAccuracyGreedyAlgorithm =
    results
      .map(({ accuracyGreedyAlgorithm }) => accuracyGreedyAlgorithm)
      .reduce((a, b) => a + b, 0) / nSizeResults.length;
  const averageExecutionTimeBranchAndBoundAlgorithm =
    results
      .map(
        ({ executionTimeBranchAndBoundAlgorithm }) =>
          executionTimeBranchAndBoundAlgorithm
      )
      .reduce((a, b) => a + b, 0) / nSizeResults.length;
  const averageAccuracyBranchAndBoundAlgorithm =
    results
      .map(
        ({ accuracyBranchAndBoundAlgorithm }) => accuracyBranchAndBoundAlgorithm
      )
      .reduce((a, b) => a + b, 0) / nSizeResults.length;
  const averageExecutionTimeHillClimbingAlgorithm =
    results
      .map(
        ({ executionTimeHillClimbingAlgorithm }) =>
          executionTimeHillClimbingAlgorithm
      )
      .reduce((a, b) => a + b, 0) / nSizeResults.length;
  const averageAccuracyHillClimbingAlgorithm =
    results
      .map(({ accuracyHillClimbingAlgorithm }) => accuracyHillClimbingAlgorithm)
      .reduce((a, b) => a + b, 0) / nSizeResults.length;
  return {
    taskSize,
    averageExecutionTimeGreedyAlgorithm,
    averageAccuracyGreedyAlgorithm,
    averageExecutionTimeBranchAndBoundAlgorithm,
    averageAccuracyBranchAndBoundAlgorithm,
    averageExecutionTimeHillClimbingAlgorithm,
    averageAccuracyHillClimbingAlgorithm,
  };
};

export { getAverageExperimentResult };
