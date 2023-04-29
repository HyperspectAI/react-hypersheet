import React from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell';
import { HeaderKey } from './types';
import useStyles from './styles';

interface Props {
  headers: HeaderKey[]
}

function TableHeader({
  headers,
}: Props) {
  const classes = useStyles();
  return (
    <div className={classes.tableHeader}>
      {
        headers.map((header) => (
          <Cell value={header.headerName} />
        ))
      }
    </div>
  );
}

TableHeader.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  headers: PropTypes.array.isRequired,
};

export default TableHeader;
