interface IExperiment {
  id: number;
  taskSize: number;
  executionTimeGreedyAlgorithm?: number;
  accuracyGreedyAlgorithm?: number;
  executionTimeBranchAndBoundAlgorithm?: number;
  accuracyBranchAndBoundAlgorithm?: number;
  executionTimeHillClimbingAlgorithm?: number;
  accuracyHillClimbingAlgorithm?: number;
  [index: string]: number | undefined;
}

export type { IExperiment };
