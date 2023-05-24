/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useContext } from 'react';
import DataSheet from './DataSheet';
import { GlobalStateContext, GlobalStateProvider } from './context';
import { HeaderKey } from './types';

interface Props {
  showPageHeader: boolean;
  showToolbar: boolean;
  headers: HeaderKey[];
  rows: any;
  docTitle: string;
}
/*
  This function is used as a wrapper component to access props data and set data in context;
  if it is not used as a wrapper component, the data in context is not set.
  if need to remove extra function then Create context on this page and assign props value to context
*/
function Table(props: Props) {
  const Global: any = useContext(GlobalStateContext);
  useEffect(() => {
    Global.setRows(props.rows);
    Global.setHeaders(props.headers);
    Global.setCommonState({
      showPageHeader: props.showPageHeader,
      showToolbar: props.showToolbar,
      docTitle: props.docTitle,
    });

    if (Global.isClear) {
      Global.setRows(props.rows);
      Global.setIsClear(false);
    }
  }, [
    props.rows,
    props.headers,
    props.showPageHeader,
    props.showToolbar,
    props.docTitle,
    Global.isClear,
  ]);

  return <DataSheet />;
}

export default function WrapperComponent(props: Props) {
  return (
    <GlobalStateProvider>
      <div className="hypersheet-root">
        <div>
          <Table {...props} />
        </div>

      </div>
    </GlobalStateProvider>
  );
}
