import { useState } from 'react';
import { Experiments, Task } from './modules/student/containers';
import './App.css';

const App = () => {
  const [isExperimentsMode, setIsExperimentsMode] = useState(false);

  const toggleIsExperimentsMode = () => {
    setIsExperimentsMode(!isExperimentsMode);
  };

  return (
    <div className="App">
      {!isExperimentsMode ? (
        <Task toggleIsExperimentsMode={toggleIsExperimentsMode} />
      ) : (
        <Experiments toggleIsExperimentsMode={toggleIsExperimentsMode} />
      )}
    </div>
  );
};

export default App;
