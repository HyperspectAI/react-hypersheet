import React from 'react';
import PropTypes from 'prop-types';

interface Props {
  children : JSX.Element[] | JSX.Element;
}

function TableData({ children }:Props) {
  return (
    <div className="table-data">
      {children}
    </div>
  );
}

TableData.propTypes = {
  children: PropTypes.element.isRequired,
};

export default TableData;
