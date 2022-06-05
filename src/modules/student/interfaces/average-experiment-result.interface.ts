interface IAverageExperimentResult {
  taskSize: number;
  averageExecutionTimeGreedyAlgorithm?: number;
  averageAccuracyGreedyAlgorithm?: number;
  averageExecutionTimeBranchAndBoundAlgorithm?: number;
  averageAccuracyBranchAndBoundAlgorithm?: number;
  averageExecutionTimeHillClimbingAlgorithm?: number;
  averageAccuracyHillClimbingAlgorithm?: number;
  [index: string]: number | undefined;
}

export type { IAverageExperimentResult };
