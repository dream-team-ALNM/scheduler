import './chart.css';
import {
  VictoryBar,
  VictoryGroup,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLegend,
} from 'victory';
import lodash from 'lodash';

type ChartProps = {
  data: { taskSize: number; [index: string]: number | undefined }[];
  firstLabel: string;
  secondLabel: string;
  thirdLabel: string;
  label: string;
};

type LegendLabel = {
  name: string;
  symbol: { fill: string };
};

const Chart: React.FC<ChartProps> = ({
  data,
  firstLabel,
  secondLabel,
  thirdLabel,
  label,
}) => {
  const isExist = (fieldName: string) => {
    return data.some((el) => !lodash.isUndefined(el[fieldName]));
  };
  const isAlgorithmExist = (algorithmName: string) => {
    return data.some((el) =>
      Object.keys(el)
        .filter((key) => !lodash.isUndefined(el[key]))
        .some((key) => key.includes(algorithmName))
    );
  };
  return (
    <div className="chart">
      <VictoryChart theme={VictoryTheme.material} width={700} height={300}>
        <VictoryAxis
          style={{
            axisLabel: { fontSize: 10, padding: 20 },
            ticks: { stroke: 'grey', size: 5 },
            tickLabels: { fontSize: 8, padding: 5 },
          }}
          fixLabelOverlap
          domain={[1, 7]}
          tickValues={data.map(({ taskSize }) => taskSize)}
          tickFormat={data.map(({ taskSize }) => taskSize)}
          label="Розмірність задачі n"
        />
        <VictoryAxis
          style={{
            axisLabel: { fontSize: 10, padding: 40 },
            ticks: { stroke: 'grey', size: 5 },
            tickLabels: { fontSize: 8, padding: 5 },
          }}
          dependentAxis
          tickFormat={(x) => x}
          label={label}
        />
        <VictoryLegend
          x={50}
          y={50}
          centerTitle
          orientation="vertical"
          style={{ title: { fontSize: 10 } }}
          data={
            ([
              isAlgorithmExist('Greedy') && {
                name: 'Жадібний алгоритм',
                symbol: { fill: 'rgb(99, 2, 189)' },
              },
              isAlgorithmExist('BranchAndBound') && {
                name: 'Алгоритм гілок та меж',
                symbol: { fill: 'rgb(143, 71, 210)' },
              },
              isAlgorithmExist('HillClimbing') && {
                name: 'Алгоритм сходження на вершину',
                symbol: { fill: 'rgb(187, 113, 255)' },
              },
            ].filter(Boolean) as LegendLabel[]) ?? []
          }
        />
        <VictoryGroup offset={21}>
          {isExist(firstLabel) && (
            <VictoryBar
              style={{ data: { fill: 'rgb(99, 2, 189)' } }}
              data={data}
              x="taskSize"
              y={firstLabel}
            />
          )}
          {isExist(secondLabel) && (
            <VictoryBar
              style={{ data: { fill: 'rgb(143, 71, 210)' } }}
              data={data}
              x="taskSize"
              y={secondLabel}
            />
          )}
          {isExist(thirdLabel) && (
            <VictoryBar
              style={{ data: { fill: 'rgb(187, 113, 255)' } }}
              data={data}
              x="taskSize"
              y={thirdLabel}
            />
          )}
        </VictoryGroup>
      </VictoryChart>
    </div>
  );
};

export { Chart };
