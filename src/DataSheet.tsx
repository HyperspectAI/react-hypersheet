/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import useStyles from './styles';
import { GlobalStateContext } from './context';
import PageHeader from './PageHeader';
import Toolbar from './Toolbar';
import TableRow from './TableRow';
import TableHeader from './TableHeader';
import TableData from './TableData';
import Cell from './Cell';
import {
  addNewObjectToArray,
  downloadCSV,
  filterData,
  groupByColumnName,
  sortFunc,
} from './utils';

const renderRow = (
  rowObj: any,
  searchTerm: string,
  rowHeight: number,
  columns: any,
  handleCellChange: any,
  rowIndex: number,
  rowWidth: number,
) => (
  <>
    {
      Object.keys(rowObj).map((k: string, index: any): JSX.Element | null => {
        if (['object', 'array'].includes(typeof rowObj[k])) {
          rowObj[k] = '';
        } else if (['boolean', 'number'].includes(typeof rowObj[k])) {
          return rowObj[k] = rowObj[k].toString();
        }
        if (['string'].includes(typeof rowObj[k])) {
          return (
            columns[index]?.isVisible && (
              <Cell
                value={rowObj[k]}
                searchTerms={searchTerm}
                key={index as any}
                rowHeights={rowHeight}
                handleCellChange={handleCellChange}
                columnName={k}
                rowIndex={rowIndex}
                rowWidths={rowWidth}
              />
            )
          );
        }
        return null;
      })
    }
  </>
);
const calculateTableBodyPaddingSpace = (
  isPageHeader: boolean,
  isPageToolbar: boolean,
): string => {
  let val = 0;
  if (isPageHeader && isPageToolbar) return '135px';
  if (isPageHeader) val += 60;
  if (isPageToolbar) val += 50;
  return val.toString().concat('px');
};

function DataSheet() {
  const classes = useStyles();
  const {
    headers,
    rows,
    commonState,
    setHeaders,
    setRows,
  }: any = React.useContext(GlobalStateContext);
  const [groupData, setGroupData] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [rowHeight, setRowHeight] = useState<number>(0);
  const [rowWidth, setRowWidth] = useState<number>(0);

  function onSort(filterOption: string, option: any): void {
    const sortData = sortFunc(rows, filterOption, option);
    console.log({ rows, filterOption, option });
    setRows(sortData);
  }
  function onSearch(searchValue: string): void {
    setSearchTerm(searchValue);
  }
  function RowHeight(height: number): void {
    setRowHeight(height);
  }

  function RowWidth(height: number): void {
    setRowWidth(height);
  }

  function filter(fieldName: string, operator: any, value: any): void {
    const Data = filterData(rows, fieldName, operator, value);
    setRows(Data);
  }
  function updateVisibility(columnName: string, value: boolean): void {
    const index = headers.findIndex(
      (column: any) => column.fieldName === columnName,
    );
    const newColumns = [...headers];
    newColumns[index].isVisible = value;
    setHeaders(newColumns);
  }
  function groupByField(fieldName: string): void {
    const newGroupData = groupByColumnName(rows, fieldName);
    setGroupData(newGroupData);
  }
  function downloadData(): void {
    downloadCSV(rows, 'sample.csv');
  }
  const handleCellChange = (
    rowIndex: number,
    columnName: string,
    value: string,
  ) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex][columnName] = value;
    setRows(updatedRows);
  };
  function addTableRow() {
    setRows(addNewObjectToArray(rows));
  }

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
                <div className="table-data-row">{displayValue}</div>
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
    const firstItem = group[0]?.items?.[0];

    if (firstItem) {
      const elements = Object.keys(firstItem).map((key, index) => {
        if (!uniqueKeys.has(key)) {
          uniqueKeys.add(key);
          return (
            <div className="table-group-cell" key={index as any}>
              <div className="table-group-header">{`${key}`}</div>
            </div>
          );
        }
        return null;
      });
      return elements.filter(
        (element: any) => element !== null,
      ) as JSX.Element[];
    }

    return [];
  }

  function printPageByClass(className: string) {
    // eslint-disable-next-line max-len
    const printContent = document?.getElementsByClassName(className)[0]?.innerHTML;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
  }

  return (
    <>
      <div className={classes.fixedTop}>
        {commonState.showPageHeader
          && <PageHeader docTitle={commonState.docTitle} />}
        {commonState.showToolbar && (
          <Toolbar
            style={
              {
                'datasheet-toolbar': commonState.showPageHeader
                  ? { top: '-10px' }
                  : { top: 0 },
              }
            }
            handleSort={onSort}
            handleSearch={onSearch}
            columns={headers}
            handleRowHeightChange={RowHeight}
            handleRowWidthChange={RowWidth}
            handleFilter={filter}
            handleHideColumns={updateVisibility}
            handleGrouping={groupByField}
            handleDownloadData={downloadData}
            handlePrint={printPageByClass}
            handleNewRow={addTableRow}
          />
        )}
      </div>
      <div style={{
        paddingTop: calculateTableBodyPaddingSpace(
          commonState.showPageHeader,
          commonState.showToolbar,
        ),
      }}
      />
      <div className={`${classes.dataSheetBase} printClass`}>
        <div className={classes.dataSheetBody}>
          {groupData.length
            ? (
              <>
                <div className={classes.tableRow}>
                  <div className="table-row-group">
                    <div className="table-group-row">
                      {renderUniqueKeys(groupData)}
                    </div>
                  </div>
                </div>
                {groupData?.map((group: any, index: any) => (
                  <div key={index as any} className={classes.tableRow}>
                    <h2 className="group-selected-header">{group.groupName}</h2>
                    <div className="table-row-group">
                      {renderItems(group)}
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                <TableRow>
                  <TableHeader headers={headers} />
                </TableRow>
                {
                  rows?.length ? (
                    rows.map((rowObj: any, i1: any) => (
                      <TableRow key={i1 as any}>
                        <TableData>
                          {
                            renderRow(
                              rowObj,
                              searchTerm,
                              rowHeight,
                              headers,
                              handleCellChange,
                              i1,
                              rowWidth,
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
  );
}

DataSheet.whyDidYouRender = false;

export default DataSheet;
