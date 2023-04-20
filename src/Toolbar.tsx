/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import {
  MdRemoveRedEye,
  MdFilterList,
  MdCalendarViewMonth,
  MdOutlineSort,
  MdSearch,
} from 'react-icons/md';

type Operator = 'is' | 'is not' | 'is empty' | 'is not empty';
interface Props {
  style: {
    'datasheet-toolbar': React.CSSProperties
  }
  handleSort: any,
  handleSearch: any,
  columns: any,
  handleRowHeightChange: any,
  handleFilter: any,
  handleHideColumns: any,
  handleGrouping: any,
}
function Toolbar({
  style,
  handleSort,
  handleSearch,
  columns,
  handleRowHeightChange,
  handleFilter,
  handleHideColumns,
  handleGrouping,
}: Props) {
  const [openSortModal, setOpenSortModal] = useState(false);
  const [openRowModal, setOpenRowModal] = useState(false);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [openGroupModal, setOpenGroupModal] = useState(false);
  const [openHideFields, setOpenHideField] = useState(false);
  const [selectSortField, setSelectSortField] = useState('');
  const [rowHeight] = useState<number>(50);
  const [rowHeightOptions] = useState<number[]>([40, 50, 60, 70]);
  const [filterData, setFilterData] = useState({
    fieldName: '',
    operator: '',
    value: '',
  });
  const operators: Operator[] = ['is', 'is not', 'is empty', 'is not empty'];
  const handleSortFieldChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectSortField(event.target.value as any);
  };

  const handleRowHeight = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newHeight = parseInt(event.target.value, 10);
    handleRowHeightChange(newHeight);
  };

  const handleOrderChange = (order: any) => {
    handleSort(selectSortField, order);
  };
  const handleFilterData = () => {
    handleFilter(filterData?.fieldName, filterData?.operator, filterData?.value);
  };

  return (
    <div className="datasheet-toolbar" style={style['datasheet-toolbar']}>
      <div className="toolbar-list">
        <p className="toolbar-item">
          <MdRemoveRedEye onClick={() => { setOpenHideField(!openHideFields); }} aria-hidden="true" />
          Hide fields
          <div className="test">
            {openHideFields ? (
              columns?.map((ele: any) => (
                <div className="abc">
                  <span>{ele?.fieldName}</span>
                  <input type="checkbox" value={ele?.isVisible} onChange={() => handleHideColumns(ele?.fieldName, !ele?.isVisible)} />
                </div>
              ))
            ) : null}
          </div>
        </p>
        <p className="toolbar-item">
          <MdFilterList onClick={() => { setOpenFilterModal(!openFilterModal); }} aria-hidden="true" />
          Filter
          {openFilterModal ? (
            <>
              <select id="field-select" value={filterData?.fieldName} onChange={(e) => setFilterData((old) => ({ ...old, fieldName: e.target.value }))}>
                {columns?.map((ele: any) => (
                  <option value={ele?.fieldName}>{ele?.fieldName}</option>
                ))}
              </select>
              <select id="field-select" value={filterData?.operator} onChange={(e) => setFilterData((old) => ({ ...old, operator: e.target.value }))}>
                {operators?.map((ele: any) => (
                  <option value={ele}>{ele}</option>
                ))}
              </select>
              <input type="text" onChange={(e) => setFilterData((old) => ({ ...old, value: e.target.value }))} />
              <button onClick={handleFilterData}>Filter</button>
            </>
          ) : null}
        </p>
        <p className="toolbar-item">
          <MdCalendarViewMonth onClick={() => { setOpenGroupModal(!openGroupModal); }} aria-hidden="true" />
          Group
          {openGroupModal ? (
            columns?.map((ele: any) => (
              <span onClick={() => handleGrouping(ele?.fieldName)}>
                {ele?.fieldName}
              </span>
            ))
          ) : null}
        </p>
        <p className="toolbar-item">
          <MdOutlineSort onClick={() => { setOpenSortModal(!openSortModal); }} aria-hidden="true" />
          Sort
          {openSortModal ? (
            <>
              <select id="field-select" value={selectSortField} onChange={handleSortFieldChange}>
                {columns?.map((ele: any) => (
                  <option value={ele?.fieldName}>{ele?.fieldName}</option>
                ))}
              </select>
              <button onClick={() => handleOrderChange('asc')}>Ascending</button>
              <button onClick={() => handleOrderChange('desc')}>Descending</button>
            </>
          ) : null}
        </p>
        <p className="toolbar-item" onClick={() => { setOpenRowModal(!openRowModal); }} aria-hidden="true">
          <MdCalendarViewMonth />
          Row Height
          {openRowModal ? (
            <select id="row-height" value={rowHeight} onChange={handleRowHeight}>
              {rowHeightOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                  pixels
                </option>
              ))}
            </select>
          ) : null}
        </p>
        <p className="toolbar-item">
          <MdSearch />
          <input type="text" onChange={(e) => handleSearch(e.target.value)} />
          Search
        </p>
      </div>
    </div>
  );
}

export default Toolbar;
