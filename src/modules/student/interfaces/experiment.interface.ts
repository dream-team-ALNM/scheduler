interface IExperiment {
  id: number;
  taskSize: number;
  executionTimeGreedyAlgorithm: number;
  accuracyGreedyAlgorithm: number;
  executionTimeBranchAndBoundAlgorithm: number;
  accuracyBranchAndBoundAlgorithm: number;
  executionTimeHillClimbingAlgorithm: number;
  accuracyHillClimbingAlgorithm: number;
}

export type { IExperiment };
