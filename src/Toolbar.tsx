/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import clsx from 'clsx';
import {
  MdRemoveRedEye,
  MdFilterList,
  MdCalendarViewMonth,
  MdOutlineSort,
  MdSearch,
  MdExpandMore,
  MdFilterAlt,
  MdOutlineMenu,
} from 'react-icons/md';
import { TbSortAscending, TbSortDescending } from 'react-icons/tb';
import useStyles from './styles';

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
  handleDownloadData: any,
  handlePrint: any,
  handleNewRow: any
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
  handleDownloadData,
  handlePrint,
  handleNewRow,
}: Props) {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState({
    hideFields: false,
    filter: false,
    grouping: false,
    rowHeight: false,
    sort: false,
    other: false,
  });

  const handleModalToggle = (modalName: string) => {
    setOpenModal((prevState: any) => {
      const newState = { ...prevState };
      Object.keys(newState).forEach((key) => {
        if (key !== modalName) {
          newState[key] = false;
        }
      });
      newState[modalName] = !prevState[modalName];
      return newState;
    });
  };
  const [selectSortField, setSelectSortField] = useState('');
  const [rowHeight, setRowHeight] = useState<number>(50);
  const [rowHeightOptions] = useState<number[]>([100, 110, 120, 130]);
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
    setRowHeight(parseInt(event.target.value, 10));
    handleRowHeightChange(newHeight);
  };

  const handleOrderChange = (order: any) => {
    handleSort(selectSortField, order);
  };
  const handleFilterData = () => {
    if (filterData?.fieldName !== '' && filterData?.operator !== '' && filterData?.value !== '') {
      handleFilter(filterData?.fieldName, filterData?.operator, filterData?.value);
    }
  };

  return (
    <div className={classes.dataSheetToolbar} style={style['datasheet-toolbar']}>
      <div className={`${classes.dataSheetToolbar} toolbarList`}>

        <p className={`${classes.dataSheetToolbar} toolbarItem`}>
          <MdRemoveRedEye onClick={() => { handleModalToggle('hideFields'); }} aria-hidden="true" />
          Hide fields
          {openModal?.hideFields ? (
            <div className={`${classes.dropdownList} fieldDropdown`}>
              {columns?.map((ele: any) => (
                <div className={clsx(classes.dropdownListItem)}>
                  <input type="checkbox" value={ele?.isVisible} onChange={() => handleHideColumns(ele?.fieldName, !ele?.isVisible)} />
                  <span className={`${classes.checkboxLabel}`}>{ele?.fieldName}</span>
                </div>
              ))}
            </div>
          ) : null}
        </p>

        <p className={`${classes.dataSheetToolbar} toolbarItem`}>
          <MdFilterList onClick={() => { handleModalToggle('filter'); }} aria-hidden="true" />
          Filter
          {openModal.filter ? (
            <div className={`${classes.dropdownList} filterDropdown`}>
              <div className="filter-row grid">
                <div className="select-field">
                  <select id="field-select" value={filterData?.fieldName} onChange={(e) => setFilterData((old) => ({ ...old, fieldName: e.target.value }))}>
                    {columns?.map((ele: any) => (
                      <option value={ele?.fieldName}>{ele?.fieldName}</option>
                    ))}
                  </select>
                  <MdExpandMore />
                </div>

                <div className="select-field">
                  <select id="field-select" value={filterData?.operator} onChange={(e) => setFilterData((old) => ({ ...old, operator: e.target.value }))}>
                    {operators?.map((ele: any) => (
                      <option value={ele}>{ele}</option>
                    ))}
                  </select>
                  <MdExpandMore />
                </div>
                <input type="text" className="field-input" onChange={(e) => setFilterData((old) => ({ ...old, value: e.target.value }))} />
                <div className="icon-button">
                  <button>
                    <MdFilterAlt onClick={handleFilterData} />
                  </button>

                </div>

              </div>
            </div>
          ) : null}
        </p>
        <p className={`${classes.dataSheetToolbar} toolbarItem`}>
          <MdCalendarViewMonth onClick={() => { handleModalToggle('grouping'); }} aria-hidden="true" />
          Group
          {openModal?.grouping ? (
            <div className={`${classes.dropdownList} fieldDropdown`}>
              {columns?.map((ele: any) => (
                <span
                  onClick={() => handleGrouping(ele?.fieldName)}
                  className={clsx(classes.dropdownListItem)}
                >
                  {ele?.fieldName}
                </span>
              ))}
            </div>
          ) : null}
        </p>

        <p className={`${classes.dataSheetToolbar} toolbarItem`}>
          <MdOutlineSort onClick={() => { handleModalToggle('sort'); }} aria-hidden="true" />
          Sort
          {openModal.sort ? (
            <div className={`${classes.dropdownList} filterDropdown`}>
              <div className="sort-row grid">
                <div className="select-field">
                  <select id="field-select" value={selectSortField} onChange={handleSortFieldChange}>
                    {columns?.map((ele: any) => (
                      <option value={ele?.fieldName}>{ele?.fieldName}</option>
                    ))}
                  </select>
                  <MdExpandMore />
                </div>
                <div className="icon-button">
                  <button onClick={() => handleOrderChange('asc')}>
                    <TbSortAscending />
                  </button>
                </div>
                <div className="icon-button">
                  <button onClick={() => handleOrderChange('desc')}>
                    <TbSortDescending />
                  </button>
                </div>

              </div>
            </div>
          ) : null}
        </p>

        <p className={`${classes.dataSheetToolbar} toolbarItem`} onClick={() => { handleModalToggle('rowHeight'); }} aria-hidden="true">
          <MdCalendarViewMonth />
          Row Height
          {openModal?.rowHeight ? (
            <div className={`${classes.dropdownList} fieldDropdown`}>
              <div className="select-field">
                <select id="row-height" value={rowHeight} onChange={handleRowHeight}>
                  {rowHeightOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                      pixels
                    </option>
                  ))}
                </select>
                <MdExpandMore />
              </div>
            </div>
          ) : null}
        </p>

        <div className="search-box">
          <input
            placeholder="Search..."
            type="text"
            className="search-field"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button type="submit" className="search-icon">
            <MdSearch />
          </button>
        </div>
        <p className={`${classes.dataSheetToolbar} toolbarItem`}>
          <MdOutlineMenu onClick={() => { handleModalToggle('other'); }} aria-hidden="true" />
          {openModal?.other ? (
            <div className={`${classes.dropdownList} fieldDropdown`}>
              <div className="select-field">
                <div onClick={handleDownloadData}>CSV</div>
                <div onClick={() => handlePrint('printClass')}>Prints</div>
              </div>
            </div>
          ) : null}
        </p>
        {/* <div onClick={handleNewRow}>Add New Row</div> */}
      </div>
    </div>
  );
}

export default Toolbar;
