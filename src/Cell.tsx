import React from 'react';
import clsx from 'clsx';

interface Props {
  value: string;
}

function Cell({
  value,
}:Props) {
  const [isSelected, setIsSelected] = React.useState(false);

  return (
    <div
      className={clsx('table-cell', isSelected && 'selected-table-cell')}
      onClick={() => setIsSelected(true)}
      role="none"
    >
      {value}
    </div>
  );
}

export default Cell;
