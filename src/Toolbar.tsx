import React from 'react';
import {
  MdRemoveRedEye,
  MdFilterList,
  MdCalendarViewMonth,
  MdOutlineSort,
} from 'react-icons/md';
import PropTypes from 'prop-types';

interface Props {
  style: {
    'datasheet-toolbar': React.CSSProperties
  }
}

function Toolbar({
  style,
}: Props) {
  return (
    <div className="datasheet-toolbar" style={style['datasheet-toolbar']}>
      <div className="toolbar-list">
        <p className="toolbar-item">
          <MdRemoveRedEye />
          Hide fields
        </p>
        <p className="toolbar-item">
          <MdFilterList />
          Filter
        </p>
        <p className="toolbar-item">
          <MdCalendarViewMonth />
          Group
        </p>
        <p className="toolbar-item">
          <MdOutlineSort />
          Sort
        </p>
      </div>
    </div>
  );
}

Toolbar.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
};

Toolbar.defaultProps = {
  style: {},
};

export default Toolbar;
