/* eslint-disable react/jsx-no-bind */
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
import {
  downloadCSV,
  filterData,
  getObjectValue,
  groupByColumnName,
  sortFunc,
} from './utils';

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
        if (['number', 'string', 'object'].includes(typeof rowObj[k])) {
          return (
            columns[index]?.isVisible && (
              <Cell
                value={getObjectValue(rowObj, k).toString()}
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
  const [groupData, setGroupData] = useState<any>([]);
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
  function downloadData(): void {
    downloadCSV(data, 'test1.csv');
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

  interface Item {
    [key: string]: any;
  }
  interface Group {
    items?: Item[];
  }
  function renderItems(group?: Group) {
    if (group && group.items && group.items.length > 0) {
      const traverseObject = (obj: any): string => {
        if (typeof obj === 'object' && !Array.isArray(obj)) {
          const values = Object.values(obj)
            .map((value) => traverseObject(value))
            .filter((value) => value !== '');
          return values.join(', ');
          // eslint-disable-next-line no-else-return
        } else {
          return `${obj}`;
        }
      };

      return group.items.map((item: Item) => (
        <div className="table-group-row">
          {Object.keys(item).map((key) => {
            const value = item[key];
            let displayValue: string;
            if (typeof value === 'object') {
              displayValue = traverseObject(value);
            } else if (Array.isArray(value)) {
              displayValue = value.join(', ');
            } else {
              displayValue = `${value}`;
            }
            return (
              <div key={key} className="table-group-cell">
                <div>{displayValue}</div>
              </div>
            );
          })}
        </div>
      ));
      // eslint-disable-next-line no-else-return
    } else {
      return null;
    }
  }

  function renderUniqueKeys(group: any): JSX.Element[] {
    const uniqueKeys = new Set<string>();
    return group?.items?.length
      ? group.items.map((item: any) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        Object.keys(item).map((key) => {
          if (!uniqueKeys.has(key)) {
            uniqueKeys.add(key);
            return (
              <div className="table-group-cell" key={key}>
                <div className="table-group-header">{`${key}`}</div>
              </div>
            );
          }
          return null;
        }),
        // eslint-disable-next-line function-paren-newline
      )
      : [];
  }

  function printPageByClass(className: string) {
    const printContent = document?.getElementsByClassName(className)[0]?.innerHTML;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
  }
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
              handleDownloadData={downloadData}
              handlePrint={printPageByClass}
            />
          )}
        </div>
        <div style={{
          paddingTop: calculateTableBodyPaddingSpace(showPageHeader, showToolbar),
        }}
        />
        <div className={`${classes.dataSheetBase} printClass`}>
          <div className={classes.dataSheetBody}>
            {groupData.length
              ? (
                groupData?.map((group: any) => (
                  <div key={group.groupName} className={classes.tableRow}>
                    <h2 className="group-selected-header">{group.groupName}</h2>
                    <div className="table-row-group">
                      <div className="table-group-row">
                        {renderUniqueKeys(group)}
                      </div>
                      {renderItems(group)}
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <TableRow>
                    <TableHeader headers={headers} />
                  </TableRow>
                  {/* {Object.keys(groupData).length !== 0 ? renderGroupRow(groupData) : null} */}
                  {
                    data?.length ? (
                      data.map((rowObj: any, i1: any) => (
                        <TableRow key={i1 as any}>
                          <TableData>
                            {
                              renderRow(
                                rowObj,
                                searchTerm,
                                rowHeight,
                                columns,
                                handleCellChange,
                                i1,
                              )
                            }
                          </TableData>
                        </TableRow>
                      ))
                    ) : <span>Data Not Found</span>
                  }
                </>
              )}

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
