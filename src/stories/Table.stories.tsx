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

const getHeaders = (prospects:any) => {
  const arr:any[] = [];
  Object.keys(prospects[0]).map((k) => arr.push({
    fieldName: k,
    headerName: k.toUpperCase(),
    isVisible: true,
  }));
  return arr;
};

type IPresetData = '200cols' | '400cols' | '600cols' | '1000cols' ;

const getProspects = (presetData:IPresetData) => {
  if (presetData === '200cols') return twoHundredCols;
  if (presetData === '400cols') return fourHundredCols;
  if (presetData === '600cols') return sixHundredCols;
  if (presetData === '1000cols') return oneThousandCols;
  return null;
};

function StoryComp() {
  const [presetData, setPresetData] = React.useState<IPresetData | null>(null);
  const prospects = getProspects(presetData as any);

  React.useEffect(() => {
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
      />
      )}
    </div>
  );
}

export const DatasheetTable:Story = {
  render: () => <StoryComp />,
};

export const parameters = { layout: 'fullscreen' };
