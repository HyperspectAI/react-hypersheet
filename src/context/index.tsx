/* eslint-disable max-len */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState } from 'react';
import { GlobalStateContextVals } from '../types';

interface ProviderProps {
  children: JSX.Element
}

export const GlobalStateContext: React.Context<GlobalStateContextVals | any> = createContext({});

export function GlobalStateProvider({
  children,
}: ProviderProps) {
  const [headers, setHeaders] = useState([]);
  const [rows, setRows] = useState([]);
  const [isClear, setIsClear] = useState(false);
  const [columnsWidthHeight, setColumnsWidthHeight] = useState({
    width: 120,
    height: 40,
  });
  const [commonState, setCommonState] = useState({
    showPageHeader: false,
    showToolbar: false,
    docTitle: '',
  });
  return (
    <GlobalStateContext.Provider value={{
      headers,
      rows,
      commonState,
      isClear,
      columnsWidthHeight,
      setHeaders,
      setRows,
      setCommonState,
      setIsClear,
      setColumnsWidthHeight,
    }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
}
