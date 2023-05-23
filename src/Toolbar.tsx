/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
import React, { useRef, useState } from 'react';
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
  MdClose,
} from 'react-icons/md';
import { TbSortAscending, TbSortDescending } from 'react-icons/tb';
import useStyles from './styles';
import { useOnClickOutside } from './utils';

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
  handleNewRow: any,
  handleRowWidthChange: any,
  handleClear: any
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
  handleRowWidthChange,
  handleClear,
}: Props) {
  const classes = useStyles();
  const refs: any = useRef();
  const [openModal, setOpenModal] = useState({
    hideFields: false,
    filter: false,
    grouping: false,
    rowHeight: false,
    sort: false,
    other: false,
    rowWidth: false,
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
  const [rowWidth, setRowWidth] = useState<number>(50);
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

  const handleRowWidth = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newHeight = parseInt(event.target.value, 10);
    setRowWidth(parseInt(event.target.value, 10));
    handleRowWidthChange(newHeight);
  };

  const handleOrderChange = (order: any) => {
    handleSort(selectSortField, order);
  };
  const handleFilterData = () => {
    if (filterData?.fieldName !== '' && filterData?.operator !== '' && filterData?.value !== '') {
      handleFilter(filterData?.fieldName, filterData?.operator, filterData?.value);
    }
  };
  useOnClickOutside(refs, () => {
    setOpenModal({
      hideFields: false,
      filter: false,
      grouping: false,
      rowHeight: false,
      sort: false,
      other: false,
      rowWidth: false,
    });
  });

  return (
    <div className={classes.dataSheetToolbar} style={style['datasheet-toolbar']}>
      <div className={`${classes.dataSheetToolbar} toolbarList`} ref={refs}>

        <div className={`${classes.dataSheetToolbar} toolbarItem`}>
          <p className={`${classes.dataSheetText}`} onClick={() => { handleModalToggle('hideFields'); }} aria-hidden="true">
            <MdRemoveRedEye />
            Hide fields
          </p>
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
        </div>
        <div className={`${classes.dataSheetToolbar} toolbarItem`}>
          <p className={`${classes.dataSheetText}`} onClick={() => { handleModalToggle('filter'); }} aria-hidden="true">
            <MdFilterList />
            Filter
          </p>
          {openModal.filter ? (
            <div className={`${classes.dropdownList} filterDropdown`}>
              <div className="filter-row grid">
                <div className="select-field">
                  <select id="field-select" value={filterData?.fieldName} onChange={(e) => setFilterData((old) => ({ ...old, fieldName: e.target.value }))}>
                    <option value="">Select Field</option>
                    {columns?.map((ele: any) => (
                      <option value={ele?.fieldName}>{ele?.fieldName}</option>
                    ))}
                  </select>
                  <MdExpandMore />
                </div>

                <div className="select-field">
                  <select id="field-select" value={filterData?.operator} onChange={(e) => setFilterData((old) => ({ ...old, operator: e.target.value }))}>
                    <option value="">Select Operator</option>
                    {operators?.map((ele: any) => (
                      <option value={ele}>{ele}</option>
                    ))}
                  </select>
                  <MdExpandMore />
                </div>
                <input type="text" className="field-input" onChange={(e) => setFilterData((old) => ({ ...old, value: e.target.value }))} value={filterData.value} />
                <div className="icon-button">
                  <button>
                    <MdFilterAlt onClick={handleFilterData} />
                  </button>

                </div>
                <div className="icon-button">
                  <button>
                    <MdClose onClick={() => {
                      handleClear();
                      setFilterData({
                        fieldName: '',
                        operator: '',
                        value: '',
                      });
                    }}
                    />
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <div className={`${classes.dataSheetToolbar} toolbarItem`}>
          <p className={`${classes.dataSheetText}`} onClick={() => { handleModalToggle('grouping'); }} aria-hidden="true">
            <MdCalendarViewMonth />
            Group
          </p>
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
        </div>
        <div className={`${classes.dataSheetToolbar} toolbarItem`}>
          <p className={`${classes.dataSheetText}`} onClick={() => { handleModalToggle('sort'); }} aria-hidden="true">
            <MdOutlineSort />
            Sort
          </p>
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
                <div className="icon-button">
                  <button>
                    <MdClose onClick={handleClear} />
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <div className={`${classes.dataSheetToolbar} toolbarItem`}>
          <p className={`${classes.dataSheetText}`} onClick={() => { handleModalToggle('rowHeight'); }} aria-hidden="true">
            <MdCalendarViewMonth />
            Row Height
          </p>
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
        </div>
        <div className={`${classes.dataSheetToolbar} toolbarItem`}>
          <p className={`${classes.dataSheetText}`} onClick={() => { handleModalToggle('rowWidth'); }} aria-hidden="true">
            <MdCalendarViewMonth />
            Row Width
          </p>
          {openModal?.rowWidth ? (
            <div className={`${classes.dropdownList} fieldDropdown`}>
              <div className="select-field">
                <select id="row-height" value={rowWidth} onChange={handleRowWidth}>
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
        </div>

        {/* <div className="search-box">
          <input
            placeholder="Search..."
            type="text"
            className="search-field"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button type="submit" className="search-icon">
            <MdSearch />
          </button>
        </div> */}
        <div className={`${classes.dataSheetToolbar} toolbarItem`}>
          <p className={`${classes.dataSheetText}`} onClick={() => { handleModalToggle('other'); }} aria-hidden="true">
            <MdOutlineMenu />
            {openModal?.other ? (
              <div className={`${classes.dropdownList} fieldDropdown`}>
                <div className="select-field">
                  <div onClick={handleDownloadData}>CSV</div>
                  {/* <div onClick={() => handlePrint('printClass')}>Prints</div> */}
                </div>
              </div>
            ) : null}
          </p>
        </div>
        {/* <div onClick={handleNewRow}>Add New Row</div> */}
      </div>
    </div>
  );
}

export default Toolbar;
