/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import {
  MdRemoveRedEye,
  MdFilterList,
  MdCalendarViewMonth,
  MdOutlineSort,
  MdSearch,
} from 'react-icons/md';

interface Props {
  style: {
    'datasheet-toolbar': React.CSSProperties
  }
  handleSort: any,
  handleSearch: any,
  columns: any,
  handleRowHeightChange: any
}
function Toolbar({
  style,
  handleSort,
  handleSearch,
  columns,
  handleRowHeightChange,
}: Props) {
  const [openSortModal, setOpenSortModal] = useState(false);
  const [openRowModal, setOpenRowModal] = useState(false);
  const [selectSortField, setSelectSortField] = useState('');

  const [rowHeight] = useState<number>(50);
  const [rowHeightOptions] = useState<number[]>([40, 50, 60, 70]);
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
  return (
    <div className="datasheet-toolbar" style={style['datasheet-toolbar']}>
      <div className="toolbar-list">
        <p className="toolbar-item">
          <MdRemoveRedEye />
          Hide fields
        </p>
        <p className="toolbar-item" aria-hidden="true">
          <MdFilterList />
          Filter
        </p>
        <p className="toolbar-item">
          <MdCalendarViewMonth />
          Group
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
                // eslint-disable-next-line react/jsx-tag-spacing
                <option key={option} value={option} >
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
