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
      <div className={`${classes.dataSheetToolbar} toolbarList`}>
        <p className={`${classes.dataSheetToolbar} toolbarItem`}>
          <MdRemoveRedEye />
          Hide fields
        </p>
        <p className={`${classes.dataSheetToolbar} toolbarItem`}>
          <MdFilterList />
          Filter
        </p>
        <p className={`${classes.dataSheetToolbar} toolbarItem`}>
          <MdCalendarViewMonth />
          Group
        </p>
        <p className={`${classes.dataSheetToolbar} toolbarItem`}>
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
