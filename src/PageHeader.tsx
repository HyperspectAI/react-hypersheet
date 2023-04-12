import React from 'react';
import { MdOutlineInsertDriveFile } from 'react-icons/md';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import useStyles from './styles';

interface Props {
  docTitle: string;
}

interface Props {
  style: {
    'page-header': React.CSSProperties
  }
}

function PageHeader({
  docTitle,
  style,
}: Props) {
  const classes = useStyles();
  return (
    <div className={classes.pageHeader} style={style['page-header']}>
      <div className={clsx(classes.container, classes.dFlex, classes.alignItemsCenter)}>
        <div className={clsx('page-title', classes.dFlex, classes.alignItemsCenter)}>
          <MdOutlineInsertDriveFile
            color="white"
            style={{
              marginRight: '10px',
            }}
          />
          {docTitle}
        </div>
      </div>
    </div>
  );
}

PageHeader.propTypes = {
  docTitle: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
};

PageHeader.defaultProps = {
  style: {},
};

export default PageHeader;
