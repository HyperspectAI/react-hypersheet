/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState } from 'react';
import { GlobalStateContextVals } from '../types';

interface ProviderProps {
  children: JSX.Element
}

export const GlobalStateContext: React.Context<GlobalStateContextVals | {}> = createContext({});

export function GlobalStateProvider({
  children,
}: ProviderProps) {
  const [headers, setHeaders] = useState([]);
  const [rows, setRows] = useState([]);
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
      setHeaders,
      setRows,
      setCommonState,
    }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
}
