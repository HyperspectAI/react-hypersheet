interface GlobalStateContextVals {
  headers: HeaderKey[],
  rows: any[],
  setHeaders: React.Dispatch<React.SetStateAction<never[]>>,
  setRows: React.Dispatch<React.SetStateAction<string[]>>
}

interface HeaderKey {
  isVisible: boolean;
  fieldName: string;
  headerName: string;
}

interface Data {
  [key: string]: number | string | boolean | null;
}
type Direction = 'asc' | 'desc';
type Operator = 'is' | 'is not' | 'is empty' | 'is not empty';

interface ObjectUnion {
  [key: string]: any;
}
interface TooltipProps {
  content: string;
  children: React.ReactElement;
}
export {
  HeaderKey,
  GlobalStateContextVals,
  Data,
  Direction,
  Operator,
  ObjectUnion,
  TooltipProps,
};
