import React from 'react';
import clsx from 'clsx';
import useStyles from './styles';

interface Props {
  value: string;
}

function Cell({
  value,
}: Props) {
  const classes = useStyles();

  const [isSelected, setIsSelected] = React.useState(false);

  return (
    <div
      className={clsx(classes.tableCell, isSelected && classes.selectedTableCell)}
      onClick={() => setIsSelected(true)}
      role="none"
    >
      {value}
    </div>
  );
}

export default Cell;
