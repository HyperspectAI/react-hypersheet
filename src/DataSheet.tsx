/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/jsx-tag-spacing */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useStyles from './styles';
import { HeaderKey } from './types';
import { GlobalStateProvider } from './context';
import PageHeader from './PageHeader';
import Toolbar from './Toolbar';
import TableRow from './TableRow';
import TableHeader from './TableHeader';
import TableData from './TableData';
import Cell from './Cell';
import { filterData, groupByColumnName, sortFunc } from './utils';

interface Props {
  showPageHeader: boolean;
  showToolbar: boolean;
  headers: HeaderKey[];
  rows: any[];
  docTitle: string;
}

const renderRow = (
  rowObj: any,
  searchTerm: string,
  rowHeight: number,
  columns: any,
  handleCellChange: any,
  rowIndex: number,
) => (
  <>
    {
      Object.keys(rowObj).map((k: string, index: any): JSX.Element | null => {
        if (typeof rowObj[k] === 'string') {
          return (
            columns[index]?.isVisible && (
              <Cell
                value={rowObj[k]}
                searchTerms={searchTerm}
                key={rowObj[k]}
                rowHeights={rowHeight}
                handleCellChange={handleCellChange}
                columnName={k}
                rowIndex={rowIndex}
              />
            )
          );
        }
        return null;
      })
    }
  </>
);

const renderGroupRow = (rowObj: any) => (
  <>
    {
      Object.entries(rowObj).map((key: any) => (
        key.map((ele: any) => (
          <KeyValueList data={ele} />
        ))
      ))
    }
  </>
);

// eslint-disable-next-line react/prop-types
function KeyValueList({ data }: any) {
  const entries = Object?.entries(data);
  return (
    <div>
      {entries?.length && entries?.map(([key, values]: any) => (
        <div key={key}>
          <strong>{key}: </strong>
          {typeof values === 'object' ? (
            <KeyValueList data={values} />
          ) : (
            <span>{values}</span>
          )}
        </div >
      ))}
    </div >
  );
}

const calculateTableBodyPaddingSpace = (isPageHeader: boolean, isPageToolbar: boolean): string => {
  let val = 0;
  if (isPageHeader && isPageToolbar) return '135px';
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
  const [groupData, setGroupData] = useState<any>(rows);
  const [searchTerm, setSearchTerm] = useState('');
  const [rowHeight, setRowHeight] = useState<number>(0);
  const [columns, setColumns] = useState(headers);
  function onSort(filterOption: string, option: any): void {
    // eslint-disable-next-line @typescript-eslint/comma-spacing
    const sortData = sortFunc(data, filterOption, option);
    setData(sortData);
    setGroupData({});
  }
  function onSearch(searchValue: string): void {
    setSearchTerm(searchValue);
    setGroupData({});
  }
  function RowHeight(height: number): void {
    setRowHeight(height);
    setGroupData({});
  }
  function filter(fieldName: string, operator: any, value: any): void {
    const newFilterData = filterData(data, fieldName, operator, value);
    setData(newFilterData);
    setGroupData({});
  }
  function updateVisibility(columnName: string, value: boolean): void {
    const index = columns.findIndex((column) => column.fieldName === columnName);
    const newColumns = [...columns];
    newColumns[index].isVisible = value;
    setColumns(newColumns);
  }
  function groupByField(fieldName: string): void {
    const newGroupData = groupByColumnName(data, fieldName);
    setGroupData(newGroupData);
  }
  const handleCellChange = (
    rowIndex: number,
    columnName: string,
    value: string,
  ) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex][columnName] = value;
    setData(updatedRows);
  };
  const classes = useStyles();
  return (
    <GlobalStateProvider>
      <>
        <div className={classes.fixedTop}>
          {showPageHeader && <PageHeader docTitle={docTitle} />}
          {showToolbar && (
            <Toolbar
              style={{ 'datasheet-toolbar': showPageHeader ? { top: '-10px' } : { top: 0 } }}
              handleSort={onSort}
              handleSearch={onSearch}
              columns={columns}
              handleRowHeightChange={RowHeight}
              handleFilter={filter}
              handleHideColumns={updateVisibility}
              handleGrouping={groupByField}
            />
          )}
        </div>
        <div style={{
          paddingTop: calculateTableBodyPaddingSpace(showPageHeader, showToolbar),
        }}
        />
        <div className={classes.dataSheetBase}>
          <div className={classes.dataSheetBody}>
            <TableRow>
              <TableHeader headers={columns} />
            </TableRow>
            {/* {Object.keys(groupData).length !== 0 ? renderGroupRow(groupData) : null} */}
            {groupData.length && groupData?.map((group: any) => (
              <div key={group.groupName}>
                <h2>{group.groupName}</h2>
                <ul>
                  <div className="header">
                    {group?.items?.length && group.items.map((item: any, index: number) => (
                      // eslint-disable-next-line react/no-array-index-key, array-callback-return
                      Object.keys(item).map((key) => (
                        <div className="testt">
                          <li>{`${key}`}</li>
                        </div>
                      ))
                    ))}
                  </div>
                  <div className="Cell">
                    {group?.items?.length && group.items.map((item: any, index: number) => (
                      // eslint-disable-next-line react/no-array-index-key, array-callback-return
                      Object.keys(item).map((key) => (
                        <div className="testt2">
                          <li>{`${item[key]}`}</li>
                        </div>
                      ))
                    ))}
                  </div>
                </ul>
              </div>
            ))}
            {
              data?.length ? (
                data.map((rowObj: any, i1: any) => (
                  <TableRow key={i1 as any}>
                    <TableData>
                      {
                        renderRow(rowObj, searchTerm, rowHeight, columns, handleCellChange, i1)
                      }
                    </TableData>
                  </TableRow>
                ))
              ) : <span>Data Not Found</span>
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
