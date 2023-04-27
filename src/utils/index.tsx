/* eslint-disable no-confusing-arrow */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable no-restricted-syntax */
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

interface Data1 {
  [key: string]: any;
}

export function groupByColumnName(data: Data1[], columnName: string): any[] {
  const groups: any = {};

  // Group the data by the column name
  data.forEach((item: any) => {
    const groupValue = item[columnName];
    if (!groups[groupValue]) {
      groups[groupValue] = [];
    }
    groups[groupValue].push(item);
  });

  // Convert the grouped data into an array of objects
  const result: any[] = [];
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
type ObjectUnion = {
  [key: string]: any;
};

declare global {
  interface Navigator {
    msSaveBlob: (blob: Blob, fileName: string) => boolean
  }
}

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
      // eslint-disable-next-line implicit-arrow-linebreak
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
interface NestedObject {
  [key: string]: any;
}
export function getObjectValue(obj: NestedObject, key: string): any {
  if (key in obj) {
    const value = obj[key];
    if (typeof value === 'object' && value !== null) {
      // If the value is a nested object, recursively call this function on it
      // and join the values with commas
      return Object.values(value)
        .map((nestedValue) =>
          typeof nestedValue === 'object' && nestedValue !== null
            ? getObjectValue(nestedValue, Object.keys(nestedValue)[0])
            : nestedValue
        // eslint-disable-next-line @typescript-eslint/indent, function-paren-newline
         )
        .join(',');
    } else {
      // Otherwise, return the value itself
      return value;
    }
  } else {
    // If the key doesn't exist in the object, return undefined
    return undefined;
  }
}
