import React from 'react';
import clsx from 'clsx';
import { renderHighlightedText } from './utils';

interface Props {
  value: string;
  searchTerms: string;
  rowHeights: number;
  handleCellChange: any;
  columnName: any;
  rowIndex: any;
}

function Cell({
  value,
  searchTerms,
  rowHeights,
  handleCellChange,
  columnName,
  rowIndex,
}:Props) {
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
      <input
        className={clsx('table-cell', isSelected && 'selected-table-cell')}
        type="text"
        value={currentValue}
        onChange={handleChange}
        onBlur={handleBlur}
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
      />
    );
  }

  return (
    <div
      style={{ height: rowHeights }}
      className={clsx('table-cell', isSelected && 'selected-table-cell')}
      onClick={() => setIsSelected(true)}
      role="none"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: renderHighlightedText(value, searchTerms) }}
      onDoubleClick={handleDoubleClick}
    />
  );
}

export default Cell;
