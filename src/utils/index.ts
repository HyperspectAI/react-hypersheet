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
  const groups: Record<string, any[]> = {}; // Initialize an empty object to store the groups

  // Group the data by the column name
  for (const item of data) { // Iterate over each item in the data array
    const groupValue = item[columnName]; // Get the value of the specified column for the current item
    if (!(groupValue in groups)) { // Check if a group with the current value exists in the groups object
      groups[groupValue] = []; // If not, create an empty array for that group
    }
    groups[groupValue].push(item); // Add the current item to the corresponding group
  }

  const result: any[] = []; // Initialize an empty array to store the result

  // Iterate over the groups and create the result array
  for (const groupName in groups) {
    if (Object.prototype.hasOwnProperty.call(groups, groupName)) { // Check if the current group is a direct property of the groups object
      result.push({
        groupName, // Store the group name in the result object
        items: groups[groupName], // Store the array of items belonging to the group in the result object
      });
    }
  }

  return result; // Return the final result array
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

export function getObjectValue(obj: Record<string, any>, key: string): any {
  if (key in obj) { // Check if the key exists in the object
    const value = obj[key]; // Get the value associated with the key
    if (typeof value === 'object' && value !== null) { // Check if the value is an object (excluding null)
      const nestedValues = []; // Array to store the values of nested objects
      // eslint-disable-next-line guard-for-in
      for (const nestedKey in value) { // Iterate over the properties of the nested object
        const nestedValue = value[nestedKey]; // Get the value of the nested property
        if (typeof nestedValue === 'object' && nestedValue !== null) { // Check if the nested value is an object (excluding null)
          const nestedValueKeys = Object.keys(nestedValue); // Get the keys of the nested object
          if (nestedValueKeys.length > 0) { // Check if there are any keys in the nested object
            // Recursively call getObjectValue for nested objects
            nestedValues.push(getObjectValue(nestedValue, nestedValueKeys[0])); // Get the value of the first nested key
          }
        } else {
          // Store the nested value in the array
          nestedValues.push(nestedValue);
        }
      }
      // Join the nested values with commas
      return nestedValues.join(',');
    } else {
      return value; // Return the value if it's not an object
    }
  } else {
    return undefined; // Key not found in the object
  }
}

/**
 * @deprecated This function will be removed in next build, Please use
 appendObjectInArray function from utils
 */
export function addNewObjectToArray(arr: Array<any>): Array<any> {
  // Find the maximum ID value in the array
  let maxId = 0;
  for (const obj of arr) { // Iterate over each object in the array
    if (obj.id && obj.id > maxId) { // Check if the object has an 'id' property and if it's greater than the current maxId
      maxId = obj.id; // Update the maxId if a higher value is found
    }
  }

  const newObjWithId: any = { id: maxId + 1 }; // Create a new object with an incremented id
  const sourceObject = arr[0]; // Assuming at least one object exists in the array, get the first object as a reference

  Object.keys(sourceObject).forEach((key: string) => { // Iterate over the keys of the source object
    if (key !== 'id') { // Exclude the 'id' key from being copied
      newObjWithId[key] = sourceObject[key]; // Copy the value from the source object to the new object
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
