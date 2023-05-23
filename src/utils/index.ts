/* eslint-disable no-restricted-syntax */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-else-return */
import { useEffect } from 'react';
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
  // Custom sorting algorithm
  const customSort = (arr: Data[]): Data[] => {
    if (arr.length <= 1) {
      return arr;
    }

    // Choose pivot element
    const pivotIndex = Math.floor(arr.length / 2);
    const pivot: any = arr[pivotIndex];

    // Partition the array based on pivot value
    const less: Data[] = [];
    const equal: Data[] = [];
    const greater: Data[] = [];

    for (const item of arr) {
      const value = item[field];

      // Compare field value with pivot
      if (value === null || value === undefined) {
        equal.push(item); // Values that are null or undefined are grouped in the 'equal' array
      } else if (value < pivot[field]) {
        less.push(item); // Values less than the pivot are grouped in the 'less' array
      } else if (value > pivot[field]) {
        greater.push(item); // Values greater than the pivot are grouped in the 'greater' array
      } else {
        equal.push(item); // Values equal to the pivot are grouped in the 'equal' array
      }
    }

    // Recursively sort subarrays and combine them
    return [
      ...customSort(less),
      ...equal,
      ...customSort(greater),
    ];
  };

  // Perform custom sorting
  const sortedData = customSort([...data]);

  // Reverse the sorted array if sorting direction is descending
  return direction === 'asc' ? sortedData : sortedData.reverse();
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

// Function to check if a value is empty
function isEmpty(value: any): boolean {
  return value === null || value === undefined || value === '';
}

export function filterData(
  data: Data[],
  fieldName: string,
  operator: Operator,
  value: any,
): Data[] {
  const filteredData: Data[] = [];

  switch (operator) {
    case 'is':
      // Iterate over the data array
      for (const item of data) {
        // Check if the field value is equal to the given value
        if (item[fieldName] === value) {
          // Add the item to the filteredData array
          filteredData.push(item);
        }
      }
      break;
    case 'is not':
      // Iterate over the data array
      for (const item of data) {
        // Check if the field value is not equal to the given value
        if (item[fieldName] !== value) {
          // Add the item to the filteredData array
          filteredData.push(item);
        }
      }
      break;
    case 'is empty':
      // Iterate over the data array
      for (const item of data) {
        // Check if the field value is empty using the isEmpty function
        if (isEmpty(item[fieldName])) {
          // Add the item to the filteredData array
          filteredData.push(item);
        }
      }
      break;
    case 'is not empty':
      // Iterate over the data array
      for (const item of data) {
        // Check if the field value is not empty using the isEmpty function
        if (!isEmpty(item[fieldName])) {
          // Add the item to the filteredData array
          filteredData.push(item);
        }
      }
      break;
    default:
      // Throw an error for unsupported operators
      throw new Error(`Unsupported operator: ${operator}`);
  }

  // Return the filteredData array
  return filteredData;
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

function flattenObject(
  obj: ObjectUnion,
  prefix = '',
  result: ObjectUnion = {},
): ObjectUnion {
  // Iterate over each key in the object
  for (const key in obj) {
    // Check if the key is a direct property of the object (not inherited)
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      // Get the value corresponding to the key
      const value = obj[key];
      // Create the property name by appending the current key to the prefix
      const prop = prefix ? `${prefix}.${key}` : key;
      // Check if the value is an object (excluding arrays and null)
      if (typeof value === 'object'
        && value !== null
        && !Array.isArray(value)) {
        // Recursively flatten the nested object, passing the updated prefix and result object
        flattenObject(value, prop, result);
      } else if (Array.isArray(value)) {
        // If the value is an array, join its elements with a comma and assign to the property
        // eslint-disable-next-line no-param-reassign
        result[prop] = value.join(',');
      } else {
        // Assign the value directly to the property
        // eslint-disable-next-line no-param-reassign
        result[prop] = value;
      }
    }
  }
  // Return the flattened object
  return result;
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

export const useOnClickOutside = (ref: any, handler: any) => {
  useEffect(() => {
    const listener = (event: any) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};
