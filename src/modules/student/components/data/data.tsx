import './data.css';
import {
  BootstrapTable,
  CellEdit,
  Options,
  SearchField,
  SelectRow,
  TableHeaderColumn,
} from 'react-bootstrap-table';
import { IStudent } from '../../interfaces';
import { Button } from 'react-bootstrap';

type DataProps = {
  students: IStudent[];
  setData: any;
  openFileSelector: () => void;
  onGenerateButtonClick: () => void;
};

const Data: React.FC<DataProps> = ({
  students,
  setData,
  openFileSelector,
  onGenerateButtonClick,
}) => {
  const customConfirm = (next: () => void, dropRowKeys: any[]) => {
    const dropRowKeysStr = dropRowKeys.join(',');
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Ви впевнені, що хочете видалити рядок №${dropRowKeysStr}?`)) {
      next();
    }
  };

  const createCustomGenerateButton = () => {
    return (
      <Button className="generate-button" onClick={onGenerateButtonClick}>
        Згенерувати дані
      </Button>
    );
  };

  const createCustomFileReadButton = () => {
    return (
      <Button className="file-read-button" onClick={openFileSelector}>
        Зчитати дані з файлу
      </Button>
    );
  };

  const createCustomSearchField = () => {
    return <SearchField className="search-input" placeholder="Шукати" />;
  };

  const onAddRow = (row: IStudent): void => {
    const { i, r, t, d } = row;
    setData([...students, { ...row, i: +i, r: +r, t: +t, d: +d }]);
  };

  const onDeleteRow = (row: number[]): void => {
    setData([...students].filter((student) => !row.includes(student.i)));
  };

  const cellEditProp = {
    mode: 'click',
    blurToSave: true,
  } as CellEdit<any>;

  const selectRowProp = {
    mode: 'checkbox',
    bgColor: 'rgb(238, 193, 213, 0.65)',
  } as SelectRow<any>;

  const options = {
    handleConfirmDeleteRow: customConfirm,
    exportCSVBtn: createCustomGenerateButton,
    clearSearch: true,
    clearSearchBtn: createCustomFileReadButton,
    searchField: createCustomSearchField,
    onAddRow: onAddRow,
    onDeleteRow: onDeleteRow,
    insertText: 'Додати студента',
    deleteText: 'Видалити студента',
  } as unknown as Options<any>;

  const keyBoardNav = {
    enterToEdit: true,
  };

  return (
    <div className="data-container">
      <BootstrapTable
        data={students}
        cellEdit={cellEditProp}
        selectRow={selectRowProp}
        options={options}
        keyBoardNav={keyBoardNav}
        tableHeaderClass="table-header"
        containerStyle={{ border: 'rgb(25, 0, 48)' }}
        insertRow
        deleteRow
        exportCSV
        search
        version="4"
      >
        <TableHeaderColumn dataField="i" isKey={true}>
          Номер студента
        </TableHeaderColumn>
        <TableHeaderColumn dataField="fullName">ПІБ студента</TableHeaderColumn>
        <TableHeaderColumn dataField="r">
          Тривалість підготовки відповіді, хв
        </TableHeaderColumn>
        <TableHeaderColumn dataField="t">
          Тривалість відповіді, хв
        </TableHeaderColumn>
        <TableHeaderColumn dataField="d">
          Строк закінчення відповіді, хв
        </TableHeaderColumn>
      </BootstrapTable>
    </div>
  );
};

export { Data };
