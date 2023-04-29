import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './styles';

interface Props {
  children: JSX.Element[] | JSX.Element;
}

function TableData({ children }: Props) {
  const classes = useStyles();
  return (
    <div className={classes.tableData}>
      {children}
    </div>
  );
}

TableData.propTypes = {
  children: PropTypes.element.isRequired,
};

export default TableData;
