/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import clsx from 'clsx';
import { renderHighlightedText } from './utils';
import useStyles from './styles';
import { GlobalStateContext } from './context';

interface Props {
  value: string;
  searchTerms: string;
  columnName: any;
  rowIndex: any;
  rowObject: any;
  handleCellChange: any;
}

function Cell({
  value,
  handleCellChange,
  rowObject,
  columnName,
}: any) {
  const classes = useStyles();
  const {
    columnsWidthHeight,
  }: any = React.useContext(GlobalStateContext);
  const [isSelected] = React.useState(false);
  const [editing, setEditing] = React.useState(false);
  const handleDoubleClick = () => {
    setEditing(true);
  };
  const [currentValue, setCurrentValue] = React.useState(value);
  const handleBlur = () => {
    setEditing(false);
    handleCellChange(rowObject, columnName, currentValue);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(event.target.value);
  };

  if (editing) {
    return (
      <div
        className={clsx(classes.tableCell, isSelected && classes.selectedTableCell)}
        style={{
          height: columnsWidthHeight.height,
          width: columnsWidthHeight.width,
        }}
      >
        <input
          type="text"
          value={currentValue}
          onChange={handleChange}
          onBlur={handleBlur}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          className={clsx(classes.selectedTableCellInput)}
        />
      </div>
    );
  }
  return (
    <div
      style={{
        height: columnsWidthHeight.height,
        width: columnsWidthHeight.width,
      }}
      className={clsx(classes.tableCell, isSelected && classes.selectedTableCell)}
      role="none"
      onDoubleClick={handleDoubleClick}
      title={value}
    >
      {value}
    </div>
  );
}

export default Cell;
