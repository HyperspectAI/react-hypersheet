/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { HeaderKey } from './types';
import { GlobalStateProvider } from './context';
import PageHeader from './PageHeader';
import Toolbar from './Toolbar';
import TableRow from './TableRow';
import TableHeader from './TableHeader';
import TableData from './TableData';
import Cell from './Cell';
import { sortFunc } from './utils';

interface Props {
  showPageHeader: boolean;
  showToolbar: boolean;
  headers: HeaderKey[];
  rows: any[];
  docTitle: string;
}

const renderRow = (rowObj: any, searchTerm: string, rowHeight: number) => (
  <>
    {
      Object.keys(rowObj).map((k: string): JSX.Element | null => {
        if (typeof rowObj[k] === 'string') {
          return (
            <Cell
              value={rowObj[k]}
              searchTerms={searchTerm}
              key={rowObj[k]}
              rowHeights={rowHeight}
            />
          );
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
  const [data, setData] = useState<any>(rows);
  const [searchTerm, setSearchTerm] = useState('');
  const [rowHeight, setRowHeight] = useState<number>(0);
  function onSort(filterOption: string, option: any): void {
    // eslint-disable-next-line @typescript-eslint/comma-spacing
    const sortData = sortFunc(data, filterOption, option);
    setData(sortData);
  }
  function onSearch(searchValue: string): void {
    setSearchTerm(searchValue);
  }
  function RowHeight(height: number): void {
    setRowHeight(height);
  }

  return (
    <GlobalStateProvider>
      <>
        <div className="fixed-top">
          {showPageHeader && <PageHeader docTitle={docTitle} />}
          {showToolbar && (
            <Toolbar style={{ 'datasheet-toolbar': showPageHeader ? { top: '-10px' } : { top: 0 } }} handleSort={onSort} handleSearch={onSearch} columns={headers} handleRowHeightChange={RowHeight} />
          )}
        </div>
        <div style={{
          paddingTop: calculateTableBodyPaddingSpace(showPageHeader, showToolbar),
        }}
        />
        <div className="datasheet-base">
          <div className="datasheet-body">
            <TableRow>
              <TableHeader headers={headers} />
            </TableRow>
            {
              data.map((rowObj: any, i1: any) => (
                <TableRow key={i1 as any}>
                  <TableData>
                    {
                      renderRow(rowObj, searchTerm, rowHeight)
                    }
                  </TableData>
                </TableRow>
              ))
            }

          </div>
        </div>
      </>
    </GlobalStateProvider>
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
