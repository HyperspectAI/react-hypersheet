/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import DataSheet from './DataSheet';
import { GlobalStateContext, GlobalStateProvider } from './context';
import { HeaderKey } from './types';

interface Props {
  showPageHeader: boolean;
  showToolbar: boolean;
  headers: HeaderKey[];
  rows: any[];
  docTitle: string;
}

function Test({
  rows,
  headers,
  showToolbar,
  showPageHeader,
  docTitle,
}: Props) {
  const Global = React.useContext(GlobalStateContext);
  React.useEffect(() => {
    Global.setRows(rows);
    Global.setHeaders(headers);
    Global.setCommonState({
      showPageHeader,
      showToolbar,
      docTitle,
    });
  }, []);
  return (<DataSheet />);
}
function Table(props: any) {
  return (
    <GlobalStateProvider>
      <Test {...props} />
    </GlobalStateProvider>
  );
}

export default Table;
