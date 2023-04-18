/* eslint-disable max-len */
/* eslint-disable no-else-return */
/* eslint-disable arrow-body-style */
/* eslint-disable import/prefer-default-export */
interface Data {
  [key: string]: number | string | boolean | null;
}
type Direction = 'asc' | 'desc';
type Operator = 'is' | 'is not' | 'is empty' | 'is not empty';

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

export function filterData(data: Data[], fieldName: string, operator: Operator, value: any): Data[] {
  return data.filter((item) => {
    const fieldValue = item[fieldName];
    switch (operator) {
      case 'is':
        return fieldValue === value;
      case 'is not':
        return fieldValue !== value;
      case 'is empty':
        return fieldValue === null || fieldValue === undefined || fieldValue === '';
      case 'is not empty':
        return fieldValue !== null && fieldValue !== undefined && fieldValue !== '';
      default:
        throw new Error(`Unsupported operator: ${operator}`);
    }
  });
}
export function groupByFunc<T extends Record<string, unknown>>(
  array: T[],
  fieldName: keyof T,
): Record<string, T[]> {
  const groups: Record<string, T[]> = {};
  array.forEach((item) => {
    const value = item[fieldName];
    if (value && typeof value === 'string') {
      if (!groups[value]) {
        groups[value] = [];
      }
      groups[value].push(item);
    }
  });

  return groups;
}
