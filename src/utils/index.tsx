/* eslint-disable no-else-return */
/* eslint-disable arrow-body-style */
/* eslint-disable import/prefer-default-export */
interface Data {
  [key: string]: number | string | boolean | null;
}

type Direction = 'asc' | 'desc';

interface Filterable {
  [key: string]: string | number | null;
}

interface FilterOption {
  operator: string;
  value: string;
  options: string;
}

export function sortFunc(data: Data[], field: string, direction: Direction): Data[] {
  return data.slice().sort((a, b) => {
    const aValue = a[field];
    const bValue = b[field];
    if (aValue === null || aValue === undefined) {
      return direction === 'asc' ? 1 : -1;
    }
    if (bValue === null || bValue === undefined) {
      return direction === 'asc' ? -1 : 1;
    }
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return direction === 'asc' ? aValue - bValue : bValue - aValue;
    }
    return direction === 'asc' ? aValue.toString().localeCompare(bValue.toString()) : bValue.toString().localeCompare(aValue.toString());
  });
}
export const renderHighlightedText = (text: string, searchTerm: string) => {
  const regex = new RegExp(searchTerm, 'gi');
  const match = text.match(regex);
  if (!match) {
    return text;
  }
  const highlighted = text.replace(regex, `<mark>${match[0]}</mark>`);
  return highlighted;
};

export function filter<T extends Filterable>(
  array: T[],
  filterOptions: { [key: string]: FilterOption },
): T[] {
  return array.filter((row) => Object.keys(filterOptions).every((column) => {
    const { operator, value } = filterOptions[column];
    const rowValue = row[column];
    switch (operator) {
      case 'is': return rowValue === value;
      case 'is not': return rowValue !== value;
      case 'is empty': return rowValue === null || rowValue === '';
      case 'is not empty': return rowValue !== null && rowValue !== '';
      default: return true;
    }
  }));
}
