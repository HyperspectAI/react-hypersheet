/* eslint-disable no-console */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Table from '../index';
import twoHundredCols from './mocks/200-cols.json';
import fourHundredCols from './mocks/400-cols.json';
import sixHundredCols from './mocks/600-cols.json';
import oneThousandCols from './mocks/1000-cols.json';

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

type IPresetData = '200cols' | '400cols' | '600cols' | '1000cols';

const getProspects = (presetData: IPresetData) => {
  if (presetData === '200cols') return twoHundredCols;
  if (presetData === '400cols') return fourHundredCols;
  if (presetData === '600cols') return sixHundredCols;
  if (presetData === '1000cols') return oneThousandCols;
  return null;
};

function StoryComp() {
  const [presetData, setPresetData] = React.useState<IPresetData | null>(null);
  const prospects = getProspects(presetData as any);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(10);
  const handlePageChange = (page: any) => {
    setCurrentPage(page);
    console.log('page', page);
  };
  const handlePerPageChange = (value: any) => {
    setPerPage(value);
    console.log('value', value);
  };
  const totalItems = 100; // Replace with the actual total number of items
  const totalPages = Math.ceil(totalItems / perPage);

  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(`Number of rows passed${prospects?.length}`);
  }, [prospects]);

  if (!presetData) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px',
        marginBottom: '20px',
      }}
      >
        <small>Please selected one of preset for sample data: &nbsp;</small>
        <select onChange={(e) => setPresetData(e.target.value as IPresetData)}>
          <option value="">
            Choose option
          </option>
          <option value="200cols">
            200 Columns
          </option>
          <option value="400cols">
            400 Columns
          </option>
          <option value="600cols">
            600 Columns
          </option>
          <option value="1000cols">
            1000 Columns
          </option>
        </select>
      </div>
    );
  }

  const handleSearch = (e: any) => {
    console.log('search', e);
  };

  const handleSort = (e: any, n: any) => {
    console.log('sort', e, n);
  };

  const handleFilter = (e: any, n: any, x: any) => {
    console.log('filter', e, n, x);
  };

  return (
    <div>
      {presetData && (
        <Table
          headers={getHeaders(prospects)}
          rows={prospects}
          showPageHeader
          showToolbar
          docTitle="My document"
          key={presetData}
          onSearch={handleSearch}
          onSort={handleSort}
          onFilter={handleFilter}
          isPagination
          currentPage={currentPage}
          totalPages={totalPages}
          perPageOptions={[10, 20, 30, 40, 50]}
          perPage={perPage}
          onPageChange={handlePageChange}
          onPerPageChange={handlePerPageChange}
        />
      )}
    </div>
  );
}

export const DatasheetTable: Story = {
  render: () => <StoryComp />,
};

export const parameters = { layout: 'fullscreen' };
