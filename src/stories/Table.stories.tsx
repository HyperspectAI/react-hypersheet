import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Table from '../index';
import randomData from './mocks/200-cols.json';

const meta: Meta<typeof Table> = {
  title: 'Table',
  component: Table,
};

export default meta;

type Story = StoryObj<typeof Table>;

const getHeaders = (prospects:any) => {
  const arr:any[] = [];
  Object.keys(prospects[0]).map((k) => arr.push({
    fieldName: k,
    headerName: k.toUpperCase(),
    isVisible: true,
  }));
  return arr;
};

function StoryComp() {
  const [prospects] = React.useState(randomData);

  if (!prospects.length) return null;
  return (
    <div>
      <Table
        headers={getHeaders(prospects)}
        rows={prospects}
        showPageHeader
        showToolbar
        docTitle="My document"
      />
    </div>
  );
}

export const DatasheetTable:Story = {
  render: () => <StoryComp />,
};

export const parameters = { layout: 'fullscreen' };
