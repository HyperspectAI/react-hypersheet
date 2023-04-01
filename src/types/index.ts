interface GlobalStateContextVals {
  headers: HeaderKey[],
  rows: any[],
  setHeaders: React.Dispatch<React.SetStateAction<never[]>>,
  setRows: React.Dispatch<React.SetStateAction<never[]>>
}

interface HeaderKey {
  fieldName: string;
  headerName: string;
}

export {
  HeaderKey,
  GlobalStateContextVals,
};
