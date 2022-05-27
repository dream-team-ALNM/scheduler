import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { IAverageExperimentResult } from '../../interfaces';
import './average-experiment-results.css';

type AverageExperimentResultsProps = {
  averageExperimentResults: IAverageExperimentResult[];
};

const AverageExperimentResults: React.FC<AverageExperimentResultsProps> = ({
  averageExperimentResults,
}) => {
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
        <TableHeaderColumn dataField="averageExecutionTimeGreedyAlgorithm">
          Середній час виконання жадібного алгоритму, хв
        </TableHeaderColumn>
        <TableHeaderColumn dataField="averageExecutionTimeBranchAndBoundAlgorithm">
          Середній час виконання методу гілок та меж, хв
        </TableHeaderColumn>
        <TableHeaderColumn dataField="averageExecutionTimeHillClimbingAlgorithm">
          Середній час виконання методу сходження на вершину, хв
        </TableHeaderColumn>
        <TableHeaderColumn dataField="averageAccuracyGreedyAlgorithm">
          Середня точність жадібного алгоритму
        </TableHeaderColumn>
        <TableHeaderColumn dataField="averageAccuracyBranchAndBoundAlgorithm">
          Середня точність методу гілок та меж
        </TableHeaderColumn>
        <TableHeaderColumn dataField="averageAccuracyHillClimbingAlgorithm">
          Середня точністьметоду сходження на вершину
        </TableHeaderColumn>
      </BootstrapTable>
    </div>
  );
};

export { AverageExperimentResults };
