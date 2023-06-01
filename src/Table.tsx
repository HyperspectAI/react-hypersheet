/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useContext } from 'react';
import DataSheet from './DataSheet';
import { GlobalStateContext, GlobalStateProvider } from './context';
import { TableProps } from './types';

/*
  This function is used as a wrapper component to access props data and set data in context;
  if it is not used as a wrapper component, the data in context is not set.
  if need to remove extra function then Create context on this page and assign props value to context
*/
function Table(props: TableProps) {
  const Global: any = useContext(GlobalStateContext);
  useEffect(() => {
    Global.setRows(props.rows);
    Global.setHeaders(props.headers);
    Global.setCommonState({
      showPageHeader: props.showPageHeader,
      showToolbar: props.showToolbar,
      docTitle: props.docTitle,
    });
  }, [
    props.rows,
    props.headers,
    props.showPageHeader,
    props.showToolbar,
    props.docTitle,
  ]);

  useEffect(() => {
    if (Global.isClear) {
      Global.setRows(props.rows);
      Global.setIsClear(false);
    }
  }, [Global.isClear]);

  if (!props) {
    return null;
  }
  return (
    <DataSheet
      onHandleSearch={props?.onSearch}
      onHandleSort={props?.onSort}
      onHandleFilter={props?.onFilter}
      isPagination={props?.isPagination}
      currentPage={props?.currentPage}
      totalPages={props?.totalPages}
      perPageOptions={props?.perPageOptions}
      perPage={props?.perPage}
      onPageChange={props?.onPageChange}
      onPerPageChange={props?.onPerPageChange}
      onHandleCellChange={props.onHandleCellChange}
    />
  );
}

export default function WrapperComponent(props: TableProps) {
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
