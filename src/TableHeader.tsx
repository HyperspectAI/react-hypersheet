import React from 'react';
import PropTypes from 'prop-types';

interface Props {
  children : JSX.Element[]
}

function TableHeader({
  children,
}:Props) {
  return (
    <div className="table-header">
      {children}
    </div>
  );
}

TableHeader.propTypes = {
  children: PropTypes.element.isRequired,
};

export default TableHeader;
