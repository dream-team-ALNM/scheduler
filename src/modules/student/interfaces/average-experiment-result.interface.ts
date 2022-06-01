interface IAverageExperimentResult {
  taskSize: number;
  averageExecutionTimeGreedyAlgorithm?: number;
  averageAccuracyGreedyAlgorithm?: number;
  averageExecutionTimeBranchAndBoundAlgorithm?: number;
  averageAccuracyBranchAndBoundAlgorithm?: number;
  averageExecutionTimeHillClimbingAlgorithm?: number;
  averageAccuracyHillClimbingAlgorithm?: number;
}

export type { IAverageExperimentResult };
