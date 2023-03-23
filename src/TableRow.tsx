import React from 'react';
import PropTypes from 'prop-types';

interface Props {
  children : JSX.Element;
}

function TableRow({ children }:Props) {
  return (
    <div className="table-row">
      {children}
    </div>
  );
}

TableRow.propTypes = {
  children: PropTypes.element.isRequired,
};

export default TableRow;
