import React from 'react';
import clsx from 'clsx';
import { renderHighlightedText } from './utils';

interface Props {
  value: string;
  searchTerms: string;
  rowHeights: number;
}

function Cell({
  value,
  searchTerms,
  rowHeights,
}:Props) {
  const [isSelected, setIsSelected] = React.useState(false);
  return (
    <div
      style={{ height: rowHeights }}
      className={clsx('table-cell', isSelected && 'selected-table-cell')}
      onClick={() => setIsSelected(true)}
      role="none"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: renderHighlightedText(value, searchTerms) }}
    />
  );
}

export default Cell;
