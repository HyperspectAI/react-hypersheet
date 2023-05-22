/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import clsx from 'clsx';
import { renderHighlightedText } from './utils';
import useStyles from './styles';
import { GlobalStateContext } from './context';

interface Props {
  value: string;
  searchTerms: string;
  handleCellChange: any;
  columnName: any;
  rowIndex: any;
}

function Cell({
  value,
  searchTerms,
  handleCellChange,
  columnName,
  rowIndex,
}: any) {
  const classes = useStyles();
  const {
    columnsWidthHeight,
  }: any = React.useContext(GlobalStateContext);
  const [isSelected, setIsSelected] = React.useState(false);
  const [editing, setEditing] = React.useState(false);
  const [currentValue, setCurrentValue] = React.useState(value);
  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(event.target.value);
  };

  const handleBlur = () => {
    setEditing(false);
    handleCellChange(rowIndex, columnName, currentValue);
  };
  if (editing) {
    return (
      <div className={
        clsx(classes.tableCell, isSelected && classes.selectedTableCell)
      }
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
      className={
        clsx(classes.tableCell, isSelected && classes.selectedTableCell)
      }
      // onClick={() => setIsSelected(true)}
      role="none"
      // eslint-disable-next-line react/no-danger
      // dangerouslySetInnerHTML={
      //   { __html: renderHighlightedText(value, searchTerms) }
      // }
      // onDoubleClick={handleDoubleClick}
    >
      {value}
    </div>
  );
}

export default Cell;
