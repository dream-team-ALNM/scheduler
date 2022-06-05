import { useState } from 'react';
import { IAverageExperimentResult, IExperiment } from '../../interfaces';
import { scheduleService } from '../../../shared/services';
import {
  ExperimentResults,
  AverageExperimentResults,
  Chart,
} from '../../components';
import { Button } from 'react-bootstrap';
import { dataService } from '../../services';
import './experiments.css';
import { getAverageExperimentResult, getExperimentResult } from '../../helpers';
import lodash from 'lodash';

type ExperimentsProps = {
  toggleIsExperimentsMode: () => void;
};

const Experiments: React.FC<ExperimentsProps> = ({
  toggleIsExperimentsMode,
}) => {
  const [experiments, setExperiments] = useState<IExperiment[]>([]);
  const [averageExperimentResults, setAverageExperimentResults] = useState<
    IAverageExperimentResult[]
  >([]);

  const handleRunExperimentsClick = () => {
    const results = [] as IExperiment[];
    const averageResults = [] as IAverageExperimentResult[];
    const tasks = dataService.generateMany(7, 100);
    tasks.forEach((task, i) => {
      const lastTaskSize = results[results.length - 1]?.taskSize;
      if (
        (lastTaskSize && task.length > lastTaskSize) ||
        i === tasks.length - 1
      ) {
        averageResults.push(getAverageExperimentResult(results, lastTaskSize));
      }
      const Zmax = scheduleService.getZmaxViaBruteForceSearchAlgorithm(task);

      const {
        timeDiff: executionTimeGreedyAlgorithm,
        accuracy: accuracyGreedyAlgorithm,
      } = getExperimentResult(task, scheduleService.applyGreedyAlgorithm, Zmax);

      const {
        timeDiff: executionTimeBranchAndBoundAlgorithm,
        accuracy: accuracyBranchAndBoundAlgorithm,
      } = getExperimentResult(
        task,
        scheduleService.applyBranchAndBoundAlgorithm,
        Zmax
      );

      const {
        timeDiff: executionTimeHillClimbingAlgorithm,
        accuracy: accuracyHillClimbingAlgorithm,
      } = getExperimentResult(
        task,
        scheduleService.applyHillClimbingAlgorithm,
        Zmax
      );

      results.push({
        id: i + 1,
        taskSize: task.length,
        executionTimeGreedyAlgorithm,
        accuracyGreedyAlgorithm,
        executionTimeBranchAndBoundAlgorithm,
        accuracyBranchAndBoundAlgorithm,
        executionTimeHillClimbingAlgorithm,
        accuracyHillClimbingAlgorithm,
      });
    });
    setExperiments(results);
    setAverageExperimentResults(averageResults);
  };

  const handleRunBigExperimentsClick = () => {
    const results = [] as IExperiment[];
    const averageResults = [] as IAverageExperimentResult[];
    const tasks = dataService.generateMany(300, 1);
    tasks.forEach((task, i) => {
      const lastTaskSize = results[results.length - 1]?.taskSize;
      if (
        (lastTaskSize && task.length > lastTaskSize) ||
        i === tasks.length - 1
      ) {
        averageResults.push(getAverageExperimentResult(results, lastTaskSize));
      }

      const { timeDiff: executionTimeGreedyAlgorithm } = getExperimentResult(
        task,
        scheduleService.applyGreedyAlgorithm
      );

      const { timeDiff: executionTimeHillClimbingAlgorithm } =
        getExperimentResult(task, scheduleService.applyHillClimbingAlgorithm);

      results.push({
        id: i + 1,
        taskSize: task.length,
        executionTimeGreedyAlgorithm,
        executionTimeHillClimbingAlgorithm,
      });
    });
    setExperiments(results);
    setAverageExperimentResults(averageResults);
  };

  const isChartDisplayed = (fieldNames: string[]) => {
    return averageExperimentResults.some((result) =>
      fieldNames.some((fieldName) => !lodash.isUndefined(result[fieldName]))
    );
  };

  return (
    <div className="task">
      <ExperimentResults experiments={experiments} />
      <AverageExperimentResults
        averageExperimentResults={averageExperimentResults}
      />
      <div className="d-flex flex-column justify-content-center align-items-center">
        <Button
          variant="warning"
          className="experiment-button"
          onClick={handleRunExperimentsClick}
        >
          Запустити експерименти
        </Button>
        <Button
          variant="danger"
          className="experiment-button"
          onClick={handleRunBigExperimentsClick}
        >
          Запустити експерименти для задач великих розмірностей
        </Button>
        {!!experiments.length && (
          <>
            {isChartDisplayed([
              'averageExecutionTimeGreedyAlgorithm',
              'averageExecutionTimeBranchAndBoundAlgorithm',
              'averageExecutionTimeHillClimbingAlgorithm',
            ]) && (
              <Chart
                data={averageExperimentResults}
                firstLabel="averageExecutionTimeGreedyAlgorithm"
                secondLabel="averageExecutionTimeBranchAndBoundAlgorithm"
                thirdLabel="averageExecutionTimeHillClimbingAlgorithm"
                label="Час роботи алгоритму (хв)"
              />
            )}
            {isChartDisplayed([
              'averageAccuracyGreedyAlgorithm',
              'averageAccuracyBranchAndBoundAlgorithm',
              'averageAccuracyHillClimbingAlgorithm',
            ]) && (
              <Chart
                data={averageExperimentResults}
                firstLabel="averageAccuracyGreedyAlgorithm"
                secondLabel="averageAccuracyBranchAndBoundAlgorithm"
                thirdLabel="averageAccuracyHillClimbingAlgorithm"
                label="Абсолютне відхилення від оптимуму (хв)"
              />
            )}
          </>
        )}
        <Button
          variant="outline-info"
          className="change-mode-button experiment-button"
          onClick={toggleIsExperimentsMode}
        >
          Перейти до режиму вирішення індивідуальної задачі
        </Button>
      </div>
    </div>
  );
};

export { Experiments };
