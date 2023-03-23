import React from 'react';
import { MdOutlineInsertDriveFile } from 'react-icons/md';
import PropTypes from 'prop-types';

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
  return (
    <div className="page-header" style={style['page-header']}>
      <div className="container d-flex align-items-center">
        <div className="page-title d-flex align-items-center">
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
