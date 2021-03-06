import moment from 'moment';
import TimePicker, { TimePickerValue } from 'react-time-picker';
import DatePicker from 'react-date-picker';
import { useEffect, useState } from 'react';
import { useFilePicker } from 'use-file-picker';
import { css } from '@emotion/react';
import FadeLoader from 'react-spinners/FadeLoader';
import { IStudent } from '../../interfaces';
import { ALLOWED_FILE_TYPES, TYPES_ERROR_MESSAGE } from '../../constants';
import { FileType } from '../../enums';
import { scheduleService } from '../../../shared/services';
import { Controls, Data } from '../../components';
import './task.css';
import { Button } from 'react-bootstrap';
import { dataService } from '../../services';

type TaskProps = {
  toggleIsExperimentsMode: () => void;
};

const Task: React.FC<TaskProps> = ({ toggleIsExperimentsMode }) => {
  const [students, setStudents] = useState<IStudent[]>([]);
  const [scheduledStudents, setScheduledStudents] = useState<IStudent[]>([]);
  const [lateness, setLateness] = useState<number>(0);
  const [startTime, setStartTime] = useState('10:10');
  const [openFileSelector, { filesContent, loading, clear }] = useFilePicker({
    accept: ['.txt', '.json'],
  });
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    if (!filesContent.length) {
      return;
    }
    const [{ content, name }] = filesContent;
    if (!ALLOWED_FILE_TYPES.includes(name.split('.').pop() as FileType)) {
      clear();
      alert('Завантажте, будь ласка, файл у форматі json або txt');
    } else {
      setStudents([...JSON.parse(content)]);
    }
  }, [filesContent]);

  const checkTypes = () => {
    return students
      .map(({ i, r, t, d }) => ({
        i: +i,
        r: +r,
        t: +t,
        d: +d,
      }))
      .every(
        ({ i, r, t, d }) =>
          typeof i === 'number' &&
          typeof r === 'number' &&
          typeof t === 'number' &&
          typeof d === 'number' &&
          !isNaN(i) &&
          !isNaN(r) &&
          !isNaN(t) &&
          !isNaN(d)
      );
  };

  const handleGenerateButtonClick = () => {
    setStudents(dataService.generate());
  };

  const handleGreedyAlgorithmButtonClick = () => {
    if (!checkTypes()) {
      alert(TYPES_ERROR_MESSAGE);
      return;
    }
    const { scheduledJobs, Zmax } =
      scheduleService.applyGreedyAlgorithm(students);
    setScheduledStudents(scheduledJobs);
    setLateness(Zmax);
  };

  const handleBranchAndBoundAlgorithmButtonClick = () => {
    if (!checkTypes()) {
      alert(TYPES_ERROR_MESSAGE);
      return;
    }
    const { scheduledJobs, Zmax } =
      scheduleService.applyBranchAndBoundAlgorithm(students);
    setScheduledStudents(scheduledJobs);
    setLateness(Zmax);
  };

  const handleHillClimbingAlgorithmButtonClick = () => {
    if (!checkTypes()) {
      alert(TYPES_ERROR_MESSAGE);
      return;
    }
    const { scheduledJobs, Zmax } =
      scheduleService.applyHillClimbingAlgorithm(students);
    setScheduledStudents(scheduledJobs);
    setLateness(Zmax);
  };

  const getCalculatedStartTime = () => {
    const [hours, minutes] = startTime.split(':');
    return moment(new Date(startDate).setHours(+hours, +minutes))
      .add(lateness * -1, 'm')
      .format('hh:mm');
  };

  const getCalculatedStartDate = () => {
    const [hours, minutes] = startTime.split(':');
    return new Date(
      moment(new Date(startDate).setHours(+hours, +minutes))
        .add(lateness * -1, 'm')
        .format()
    );
  };

  return (
    <div className="task">
      {loading ? (
        <div className="spinner">
          <FadeLoader
            loading={loading}
            css={css`
              display: block;
              margin: 0 auto;
            `}
            color="blue"
          />
        </div>
      ) : (
        <Data
          onGenerateButtonClick={handleGenerateButtonClick}
          students={students}
          setData={setStudents}
          openFileSelector={openFileSelector}
        />
      )}
      <div className="d-flex justify-content-center align-items-center mb-1">
        <h5 className="bg-white">Передбачуваний час початку іспиту</h5>
        <TimePicker
          className="bg-white ml-3"
          onChange={setStartTime as (value: TimePickerValue) => void}
          value={startTime}
        />
        <DatePicker
          format="dd-MM-y"
          className="bg-white ml-3"
          onChange={setStartDate as (value: TimePickerValue) => void}
          value={startDate}
        />
      </div>
      <Controls
        onGreedyAlgorithmButtonClick={handleGreedyAlgorithmButtonClick}
        onBranchAndBoundAlgorithmButtonClick={
          handleBranchAndBoundAlgorithmButtonClick
        }
        onHillClimbingAlgorithmButtonClick={
          handleHillClimbingAlgorithmButtonClick
        }
        loading={loading}
      />
      {!!scheduledStudents.length && (
        <>
          <div className="d-flex flex-wrap justify-content-center align-items-center m-1">
            <h5 className="bg-white mr-3">
              Порядок складання іспиту студентами:
            </h5>
            {scheduledStudents.map((student, i) => (
              <h6 className="bg-white mr-2" key={student.i}>{`${
                student.fullName
              }${i !== students.length - 1 ? `,` : ''}`}</h6>
            ))}
          </div>
          <div className="d-flex justify-content-center align-items-center mb-1">
            <h5 className="bg-white">Розрахований час початку іспиту</h5>
            <TimePicker
              className="bg-white ml-3"
              value={getCalculatedStartTime()}
            />
            <DatePicker
              format="dd-MM-y"
              className="bg-white ml-3"
              value={getCalculatedStartDate()}
            />
          </div>
        </>
      )}
      <Button
        variant="outline-info"
        className="change-mode-button mb-3"
        onClick={toggleIsExperimentsMode}
      >
        Перейти до режиму експерименту
      </Button>
    </div>
  );
};

export { Task };
