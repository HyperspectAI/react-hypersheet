/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-else-return */
import {
  Data,
  Direction,
  ObjectUnion,
  Operator,
} from '../types';

declare global {
  interface Navigator {
    msSaveBlob: (blob: Blob, fileName: string) => boolean
  }
}

/**
 *
 * @deprecated This function will be removed in next build, Please use sort function from utils
 */
export function sortFunc(
  data: Data[],
  field: string,
  direction: Direction,
): Data[] {
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
    return direction === 'asc'
      ? aValue.toString().localeCompare(bValue.toString())
      : bValue.toString().localeCompare(aValue.toString());
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
/**
 *
 * @deprecated This function will be removed in next build, Please use filter function from utils
 */
export function filterData(
  data: Data[],
  fieldName: string,
  operator: Operator,
  value: any,
): Data[] {
  return data.filter((item) => {
    const fieldValue = item[fieldName];
    switch (operator) {
      case 'is':
        return fieldValue === value;
      case 'is not':
        return fieldValue !== value;
      case 'is empty':
        return fieldValue === null || fieldValue === undefined
        || fieldValue === '';
      case 'is not empty':
        return fieldValue !== null && fieldValue !== undefined
         && fieldValue !== '';
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

export function groupByColumnName(
  data: ObjectUnion[],
  columnName: string,
): any[] {
  const groups: any = {};

  // Group the data by the column name
  data.forEach((item: any) => {
    const groupValue = item[columnName];
    if (!groups[groupValue]) {
      groups[groupValue] = [];
    }
    groups[groupValue].push(item);
  });

  const result: any[] = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const groupName in groups) {
    // eslint-disable-next-line no-prototype-builtins
    if (groups.hasOwnProperty(groupName)) {
      result.push({
        // eslint-disable-next-line object-shorthand
        groupName: groupName,
        items: groups[groupName],
      });
    }
  }

  return result;
}

/**
 * @deprecated This function will be removed in next build, Please use
 flattenObj function from utils
 */

function flattenObject(obj: ObjectUnion, prefix = ''): ObjectUnion {
  return Object.keys(obj).reduce((acc, key) => {
    // eslint-disable-next-line prefer-template
    const pre = prefix.length ? prefix + '.' : '';
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      Object.assign(acc, flattenObject(obj[key], pre + key));
    } else {
      acc[pre + key] = obj[key];
    }
    return acc;
  }, {} as ObjectUnion);
}

export function downloadCSV(data: Array<ObjectUnion>, filename: string) {
  const flatData = data.map((item) => flattenObject(item));

  const allKeys = flatData.reduce((keys, obj) => {
    Object.keys(obj).forEach((key) => {
      if (!keys.includes(key)) {
        keys.push(key);
      }
    });
    return keys;
  }, [] as string[]);

  const csvData = [
    allKeys.join(','),
    ...flatData.map((item) =>
      allKeys
        .map((key: string | number) => {
          const val = item[key];
          if (typeof val === 'string') {
            return `"${val.replace(/"/g, '""')}"`;
          }
          return val;
        })
        .join(',')),
  ].join('\n');

  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });

  if (navigator.msSaveBlob) {
    navigator.msSaveBlob(blob, filename);
  } else {
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}

/**
 * @deprecated This function will be removed in next build, Please use
 getObjectValue function from utils
 */

export function getObjectValue(obj: ObjectUnion, key: string): any {
  if (key in obj) {
    const value = obj[key];
    if (typeof value === 'object' && value !== null) {
      return Object.values(value)
        // eslint-disable-next-line no-confusing-arrow
        .map((nestedValue) =>
          typeof nestedValue === 'object' && nestedValue !== null
            ? getObjectValue(nestedValue, Object.keys(nestedValue)[0])
            : nestedValue,
        // eslint-disable-next-line function-paren-newline
        )
        .join(',');
    } else {
      return value;
    }
  } else {
    return undefined;
  }
}

/**
 * @deprecated This function will be removed in next build, Please use
 appendObjectInArray function from utils
 */
export function addNewObjectToArray(arr: any) {
  // Find the maximum ID value in the array
  const maxId = arr.reduce((max: any, obj: any) =>
    Math.max(max, obj.id || 0), 0);

  const newObjWithId: any = { id: maxId + 1 };
  Object.keys(arr[0]).forEach((key: any) => {
    if (key !== 'id') {
      newObjWithId[key] = key;
    }
  });
  // Add the new object to the array
  arr.push(newObjWithId);
  // Return the updated array
  return arr;
}
