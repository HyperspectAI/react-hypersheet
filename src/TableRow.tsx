import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './styles';

interface Props {
  children: JSX.Element;
}

function TableRow({ children }: Props) {
  const classes = useStyles();
  return (
    <div className={classes.tableRow}>
      {children}
    </div>
  );
}

TableRow.propTypes = {
  children: PropTypes.element.isRequired,
};

export default TableRow;
