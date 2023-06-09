/* eslint-disable react/jsx-no-bind */
import React, { useMemo, useState } from 'react';
import useStyles from './styles';
import { GlobalStateContext } from './context';
import PageHeader from './PageHeader';
import Toolbar from './Toolbar';
import TableRow from './TableRow';
import TableHeader from './TableHeader';
import TableData from './TableData';
import Cell from './Cell';
import {
  downloadCSV,
  groupByColumnName,
} from './utils';
import AppendObjectInArray from './utils/appendObjectInArray';
import Pagination from './Pagination';

function DataSheet({
  onHandleSearch,
  onHandleSort,
  onHandleFilter,
  isPagination,
  currentPage,
  totalPages,
  perPageOptions,
  perPage,
  onPageChange,
  onPerPageChange,
  onHandleCellChange,
}: any) {
  const classes = useStyles();
  const {
    headers,
    rows,
    commonState,
    setHeaders,
    setRows,
    setIsClear,
    setColumnsWidthHeight,
  }: any = React.useContext(GlobalStateContext);
  const [groupData, setGroupData] = useState<any>([]);

  const onSort = (filterOption: string, option: any) => {
    onHandleSort(filterOption, option);
  };
  const onSearch = (searchValue: string) => {
    onHandleSearch(searchValue);
  };
  const RowHeight = (heights: number) => {
    setColumnsWidthHeight((old: any) => ({ ...old, height: heights }));
  };

  const RowWidth = (widths: number) => {
    setColumnsWidthHeight((old: any) => ({ ...old, width: widths }));
  };

  const filter = (fieldName: string, operator: any, value: any) => {
    onHandleFilter(fieldName, operator, value);
  };
  const updateVisibility = (columnName: string, value: boolean) => {
    const index = headers.findIndex(
      (column: any) => column.fieldName === columnName,
    );
    const newColumns = [...headers];
    newColumns[index].isVisible = value;
    setHeaders(newColumns);
  };
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
    currentVal : any,
  ) => {
    onHandleCellChange(rowIndex, columnName, currentVal);
  };
  function addTableRow() {
    setRows(AppendObjectInArray(rows));
  }
  function handleClear() {
    setIsClear(true);
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
  function splitArrayIntoChunks(array: any, chunkSize: number) {
    const result = [];

    for (let i = 0; i < array?.length; i += chunkSize) {
      result.push(...array.slice(i, i + chunkSize));
    }

    return result;
  }

  const cellRows = useMemo(() => {
    const visibleData: any = splitArrayIntoChunks(rows, 10);
    const data = visibleData?.map((rowObj: any[], rowIndex: any) => (
      <TableRow key={rowIndex as any}>
        <TableData>
          {Object.keys(visibleData[0]).map(
            (k: any, index: any) => {
              if (['object', 'array'].includes(typeof rowObj[k])) {
                // eslint-disable-next-line no-param-reassign
                rowObj[k] = '';
              }
              return (
                headers[index]?.isVisible && (
                <Cell
                  value={rowObj[k]}
                  key={index as any}
                  rowObject={rowObj}
                  columnName={k}
                  rowIndex={rowIndex as any}
                  handleCellChange={handleCellChange}
                />
                )
              );
            },
          )}
        </TableData>
      </TableRow>
    ));
    const filteredRows = data?.filter((row: any) => row !== null);
    return filteredRows;
  }, [rows, headers]);
  return (
    <>
      <div className={classes.fixedTop}>
        {commonState?.showPageHeader
          && <PageHeader docTitle={commonState.docTitle} />}
        {commonState?.showToolbar && (
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
            handleClear={handleClear}
          />
        )}
      </div>
      {/* <div style={{
        paddingTop: calculateTableBodyPaddingSpace(
          commonState.showPageHeader,
          commonState.showToolbar,
        ),
      }}
      /> */}
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
                  <TableHeader
                    headers={headers}
                  />
                </TableRow>
                {
                  rows?.length ? (
                    <div className={classes.tableCellBody}>
                      {cellRows}
                    </div>

                  ) : <span>Data Not Found</span>
                }
              </>
            )}

        </div>
      </div>
      <Pagination
        isPagination={isPagination}
        currentPage={currentPage}
        totalPages={totalPages}
        perPageOptions={perPageOptions}
        perPage={perPage}
        onPageChange={onPageChange}
        onPerPageChange={onPerPageChange}
      />
    </>
  );
}

DataSheet.whyDidYouRender = false;

export default DataSheet;
