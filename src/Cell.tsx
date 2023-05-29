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
}: any) {
  const classes = useStyles();
  const {
    columnsWidthHeight,
  }: any = React.useContext(GlobalStateContext);
  const [isSelected] = React.useState(false);

  return (
    <div
      style={{
        height: columnsWidthHeight.height,
        width: columnsWidthHeight.width,
      }}
      className={
        clsx(classes.tableCell, isSelected && classes.selectedTableCell)
      }
      role="none"
    >
      {value}
    </div>
  );
}

export default Cell;
