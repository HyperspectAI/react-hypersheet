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

// This function is used as a wrapper component to access props data and set data in context; if it is not used as a wrapper component, the data in context is not set.
function WrapperComponent({
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
  if (Global.isClear) {
    Global.setRows(rows);
    Global.setIsClear(false);
  }
  return (<DataSheet />);
}
function Table(props: any) {
  return (
    <GlobalStateProvider>
      <WrapperComponent {...props} />
    </GlobalStateProvider>
  );
}

export default Table;
