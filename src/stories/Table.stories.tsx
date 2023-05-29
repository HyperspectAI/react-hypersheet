/* eslint-disable no-console */
import React, { useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Table from '../index';

const meta: Meta<typeof Table> = {
  title: 'Table',
  component: Table,
};

export default meta;

type Story = StoryObj<typeof Table>;

const getHeaders = (prospects: any) => {
  const arr: any[] = [];
  Object.keys(prospects[0]).map((k) => arr.push({
    fieldName: k,
    headerName: k.toUpperCase(),
    isVisible: true,
  }));
  return arr;
};

function StoryComp() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(10);
  const [search, setSearch] = React.useState('');
  const handlePageChange = (page: any) => {
    setCurrentPage(page);
    console.log('page', page);
  };
  const handlePerPageChange = (value: any) => {
    setPerPage(value);
    console.log('value', value);
  };
  const handleSearch = (e: any) => {
    console.log('search', e);
    setSearch(e);
  };

  const handleSort = (e: any, n: any) => {
    console.log('sort', e, n);
  };

  const handleFilter = (e: any, n: any, x: any) => {
    console.log('filter', e, n, x);
  };
  const [passengersData, setData] = React.useState([]);
  useEffect(() => {
    // eslint-disable-next-line max-len
    fetch(`https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${perPage}&_search=${search}`)
      .then((response) => response.json())
      .then((json) => { setData(json); });
  }, [currentPage, perPage, search]);

  console.log('passengersData', passengersData.length / perPage);
  // const totalPages = Math.ceil(passengersData.length / perPage);
  if (!passengersData?.length) return null;
  return (
    <div>
      <Table
        headers={getHeaders(passengersData)}
        rows={passengersData}
        showPageHeader
        showToolbar
        docTitle="My document"
        key={null}
        onSearch={handleSearch}
        onSort={handleSort}
        onFilter={handleFilter}
        isPagination
        currentPage={currentPage}
        totalPages={passengersData.length}
        perPageOptions={[10, 20, 30, 40, 50]}
        perPage={perPage}
        onPageChange={handlePageChange}
        onPerPageChange={handlePerPageChange}
      />
    </div>
  );
}

export const DatasheetTable: Story = {
  render: () => <StoryComp />,
};

export const parameters = { layout: 'fullscreen' };
