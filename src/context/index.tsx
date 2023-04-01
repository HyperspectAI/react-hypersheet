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
  return (
    <GlobalStateContext.Provider value={{
      headers,
      rows,
      setHeaders,
      setRows,
    }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
}
