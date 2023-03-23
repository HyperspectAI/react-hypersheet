/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import PageHeader from './PageHeader';
import Toolbar from './Toolbar';
import TableRow from './TableRow';
import TableHeader from './TableHeader';
import TableData from './TableData';
import Cell from './Cell';

interface Headers {
  fieldName: '',
  headerName: ''
}

interface Props {
  showPageHeader: boolean;
  showToolbar: boolean;
  headers: Headers[];
  rows: any[];
  docTitle: string;
}

const renderRow = (rowObj: any) => (
  <>
    {
      Object.keys(rowObj).map((k: string): JSX.Element | null => {
        if (typeof rowObj[k] === 'string') {
          return <Cell value={rowObj[k]} key={rowObj[k]} />;
        }
        return null;
      })
    }
  </>
);

const calculateTableBodyPaddingSpace = (isPageHeader: boolean, isPageToolbar: boolean): string => {
  let val = 0;
  if (isPageHeader && isPageToolbar) return '98px';
  if (isPageHeader) val += 60;
  if (isPageToolbar) val += 50;
  return val.toString().concat('px');
};

function DataSheet({
  showPageHeader,
  showToolbar,
  headers,
  rows,
  docTitle,
}: Props) {
  return (
    <>
      <div className="fixed-top">
        {showPageHeader && <PageHeader docTitle={docTitle} />}
        {showToolbar && (
          <Toolbar style={{
            'datasheet-toolbar': showPageHeader ? { top: '-10px' } : { top: 0 },
          }}
          />
        )}
      </div>
      <div style={{
        paddingTop: calculateTableBodyPaddingSpace(showPageHeader, showToolbar),
      }}
      />
      <div className="datasheet-base">
        <div className="datasheet-body">
          <TableRow>
            <TableHeader>
              {
                headers.map((header) => (
                  <Cell value={header.headerName} />
                ))
              }
            </TableHeader>
          </TableRow>
          {
            rows.map((rowObj, i1) => (
              <TableRow key={i1 as any}>
                <TableData>
                  {
                    renderRow(rowObj)
                  }
                </TableData>
              </TableRow>
            ))
          }

        </div>
      </div>
    </>
  );
}

DataSheet.propTypes = {
  showPageHeader: PropTypes.bool,
  showToolbar: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  headers: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  rows: PropTypes.array.isRequired,
  docTitle: PropTypes.string,
};

DataSheet.defaultProps = {
  showPageHeader: true,
  showToolbar: true,
  docTitle: 'Document',
};

export default DataSheet;
