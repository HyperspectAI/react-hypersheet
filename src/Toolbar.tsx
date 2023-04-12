import React from 'react';
import {
  MdRemoveRedEye,
  MdFilterList,
  MdCalendarViewMonth,
  MdOutlineSort,
} from 'react-icons/md';
import PropTypes from 'prop-types';
import useStyles from './styles';

interface Props {
  style: {
    'datasheet-toolbar': React.CSSProperties
  }
}

function Toolbar({
  style,
}: Props) {
  const classes = useStyles();
  return (
    <div className={classes.dataSheetToolbar} style={style['datasheet-toolbar']}>
      <div className="toolbarList">
        <p className="toolbarItem">
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
