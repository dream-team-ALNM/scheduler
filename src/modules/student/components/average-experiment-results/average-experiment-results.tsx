import lodash from 'lodash';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { IAverageExperimentResult } from '../../interfaces';
import './average-experiment-results.css';

type AverageExperimentResultsProps = {
  averageExperimentResults: IAverageExperimentResult[];
};

const AverageExperimentResults: React.FC<AverageExperimentResultsProps> = ({
  averageExperimentResults,
}) => {
  const isExist = (fieldName: string) => {
    return averageExperimentResults.some(
      (result) => !lodash.isUndefined(result[fieldName])
    );
  };
  return (
    <div className="data-container">
      <BootstrapTable
        data={averageExperimentResults}
        tableHeaderClass="table-header"
        containerStyle={{ border: 'rgb(25, 0, 48)' }}
        version="4"
      >
        <TableHeaderColumn dataField="taskSize" isKey>
          Розмірність задачі
        </TableHeaderColumn>

        {isExist('averageExecutionTimeGreedyAlgorithm') && (
          <TableHeaderColumn dataField="averageExecutionTimeGreedyAlgorithm">
            Середній час виконання жадібного алгоритму, хв
          </TableHeaderColumn>
        )}
        {isExist('averageExecutionTimeBranchAndBoundAlgorithm') && (
          <TableHeaderColumn dataField="averageExecutionTimeBranchAndBoundAlgorithm">
            Середній час виконання методу гілок та меж, хв
          </TableHeaderColumn>
        )}
        {isExist('averageExecutionTimeHillClimbingAlgorithm') && (
          <TableHeaderColumn dataField="averageExecutionTimeHillClimbingAlgorithm">
            Середній час виконання методу сходження на вершину, хв
          </TableHeaderColumn>
        )}
        {isExist('averageAccuracyGreedyAlgorithm') && (
          <TableHeaderColumn dataField="averageAccuracyGreedyAlgorithm">
            Середня точність жадібного алгоритму
          </TableHeaderColumn>
        )}
        {isExist('averageAccuracyBranchAndBoundAlgorithm') && (
          <TableHeaderColumn dataField="averageAccuracyBranchAndBoundAlgorithm">
            Середня точність методу гілок та меж
          </TableHeaderColumn>
        )}
        {isExist('averageAccuracyHillClimbingAlgorithm') && (
          <TableHeaderColumn dataField="averageAccuracyHillClimbingAlgorithm">
            Середня точністьметоду сходження на вершину
          </TableHeaderColumn>
        )}
      </BootstrapTable>
    </div>
  );
};

export { AverageExperimentResults };
