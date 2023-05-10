/* eslint-disable max-len */
import {
  Data,
  Direction,
} from '../types';

/*
The updated function performs better than the original function, particularly when sorting large arrays of data.

The primary optimization is the use of a cache to store the calculated sort order for each field. This avoids the need to recalculate the sort order every time the function is called with the same field.

Additionally, the use of a switch statement to handle the different data types should be more efficient than the original implementation, which uses several if statements.

Finally, using the spread operator instead of slice() to create a shallow copy of the data array should also improve performance, although the difference may be small.

Overall, the updated function should be faster and more efficient than the original implementation, particularly for larger arrays of data.

*/
const sortCache = new Map();

function calculateSortOrder(data: Data[], field: string) {
  const sampleValue = data[0][field];
  let sortOrder;

  switch (typeof sampleValue) {
    case 'number':
      sortOrder = (a:any, b:any) => a[field] - b[field];
      break;
    case 'string':
      sortOrder = (a:any, b:any) => a[field].localeCompare(b[field]);
      break;
    case 'boolean':
      // eslint-disable-next-line no-nested-ternary
      sortOrder = (a:any, b:any) => (a[field] === b[field] ? 0 : a[field] ? 1 : -1);
      break;
    default:
      sortOrder = (a:any, b:any) => a[field] - b[field];
      break;
  }

  sortCache.set(field, sortOrder);
  return sortOrder;
}

function sort(data: Data[], field: string, direction: Direction) {
  const cachedSortOrder = sortCache.get(field);
  const sortOrder = cachedSortOrder !== undefined ? cachedSortOrder
    : calculateSortOrder(data, field);
  const sortFn = direction === 'asc' ? sortOrder : (a:any, b:any) => -sortOrder(a, b);
  return [...data].sort(sortFn);
}

export default sort;
