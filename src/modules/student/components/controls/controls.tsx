import { Button } from 'react-bootstrap';
import './controls.css';

type ControlProps = {
  onGreedyAlgorithmButtonClick: () => void;
  onBranchAndBoundAlgorithmButtonClick: () => void;
  onHillClimbingAlgorithmButtonClick: () => void;
  loading: boolean;
};

const Controls: React.FC<ControlProps> = ({
  onGreedyAlgorithmButtonClick,
  onBranchAndBoundAlgorithmButtonClick,
  onHillClimbingAlgorithmButtonClick,
  loading
}) => {
  return (
    <div className="controls">
      <Button
        variant="success"
        className="button"
        onClick={onGreedyAlgorithmButtonClick}
        disabled={loading}
      >
        Жадібний алгоритм
      </Button>
      <Button
        variant="warning"
        className="button ml-3"
        onClick={onBranchAndBoundAlgorithmButtonClick}
        disabled={loading}
      >
        Алгоритм гілок та меж
      </Button>
      <Button
        variant="danger"
        className="button ml-3"
        onClick={onHillClimbingAlgorithmButtonClick}
        disabled={loading}
      >
        Алгоритм сходження на вершину
      </Button>
    </div>
  );
};

export { Controls };
