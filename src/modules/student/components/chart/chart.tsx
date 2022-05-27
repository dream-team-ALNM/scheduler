import './chart.css';
import {
  VictoryBar,
  VictoryGroup,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLegend,
} from 'victory';

type ChartProps = {
  data: { taskSize: number }[];
  firstLabel: string;
  secondLabel: string;
  thirdLabel: string;
  label: string;
};

const Chart: React.FC<ChartProps> = ({
  data,
  firstLabel,
  secondLabel,
  thirdLabel,
  label
}) => {
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
          data={[
            {
              name: 'Жадібний алгоритм',
              symbol: { fill: 'rgb(99, 2, 189)' },
            },
            {
              name: 'Алгоритм гілок та меж',
              symbol: { fill: 'rgb(143, 71, 210)' },
            },
            {
              name: 'Алгоритм сходження на вершину',
              symbol: { fill: 'rgb(187, 113, 255)' },
            },
          ]}
        />
        <VictoryGroup offset={21}>
          <VictoryBar
            style={{ data: { fill: 'rgb(99, 2, 189)' } }}
            data={data}
            x="taskSize"
            y={firstLabel}
          />
          <VictoryBar
            style={{ data: { fill: 'rgb(143, 71, 210)' } }}
            data={data}
            x="taskSize"
            y={secondLabel}
          />
          <VictoryBar
            style={{ data: { fill: 'rgb(187, 113, 255)' } }}
            data={data}
            x="taskSize"
            y={thirdLabel}
          />
        </VictoryGroup>
      </VictoryChart>
    </div>
  );
};

export { Chart };
