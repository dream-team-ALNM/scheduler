import lodash from 'lodash';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { IExperiment } from '../../interfaces';
import './experiment-results.css';

type ExperimentResultsProps = {
  experiments: IExperiment[];
};

const ExperimentResults: React.FC<ExperimentResultsProps> = ({
  experiments,
}) => {
  const isExist = (fieldName: string) => {
    return experiments.some(
      (result) => !lodash.isUndefined(result[fieldName])
    );
  };

  return (
    <div className="data-container">
      <BootstrapTable
        data={experiments}
        tableHeaderClass="table-header"
        containerStyle={{ border: 'rgb(25, 0, 48)' }}
        version="4"
      >
        <TableHeaderColumn dataField="id" isKey>
          Номер ескперименту
        </TableHeaderColumn>
        <TableHeaderColumn dataField="taskSize">
          Розмірність задачі
        </TableHeaderColumn>
        {isExist('executionTimeGreedyAlgorithm') && (
          <TableHeaderColumn dataField="executionTimeGreedyAlgorithm">
            Час виконання жадібного алгоритму, хв
          </TableHeaderColumn>
        )}
        {isExist('executionTimeBranchAndBoundAlgorithm') && (
          <TableHeaderColumn dataField="executionTimeBranchAndBoundAlgorithm">
            Час виконання методу гілок та меж, хв
          </TableHeaderColumn>
        )}
        {isExist('executionTimeHillClimbingAlgorithm') && (
          <TableHeaderColumn dataField="executionTimeHillClimbingAlgorithm">
            Час виконання методу сходження на вершину, хв
          </TableHeaderColumn>
        )}
        {isExist('accuracyGreedyAlgorithm') && (
          <TableHeaderColumn dataField="accuracyGreedyAlgorithm">
            Точність жадібного алгоритму
          </TableHeaderColumn>
        )}
        {isExist('accuracyBranchAndBoundAlgorithm') && (
          <TableHeaderColumn dataField="accuracyBranchAndBoundAlgorithm">
            Точність методу гілок та меж
          </TableHeaderColumn>
        )}
        {isExist('accuracyHillClimbingAlgorithm') && (
          <TableHeaderColumn dataField="accuracyHillClimbingAlgorithm">
            Точність методу сходження на вершину
          </TableHeaderColumn>
        )}
      </BootstrapTable>
    </div>
  );
};

export { ExperimentResults };
