import {
  Data,
  Operator,
} from '../types';

/*
The main optimization here is to avoid using the Array.filter() method and
instead use a for loop to iterate over the data array and filter the data based
on the specified conditions.

Using a for loop can be more efficient than using the Array.filter() method
because it avoids the overhead of creating a new array and copying the matching elements.

Additionally, this implementation removes the need to call item[fieldName] for
every item in the array, which can be more efficient than calling it repeatedly
for every item using the Array.filter() method.

*/

function filterData(
  data: Data[],
  fieldName: string,
  operator: Operator,
  value: any,
): Data[] {
  const result = [];

  switch (operator) {
    case 'is':
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < data.length; i++) {
        if (data[i][fieldName] === value) {
          result.push(data[i]);
        }
      }
      break;
    case 'is not':
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < data.length; i++) {
        if (data[i][fieldName] !== value) {
          result.push(data[i]);
        }
      }
      break;
    case 'is empty':
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < data.length; i++) {
        if (data[i][fieldName] === null
          || data[i][fieldName] === undefined || data[i][fieldName] === '') {
          result.push(data[i]);
        }
      }
      break;
    case 'is not empty':
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < data.length; i++) {
        if (data[i][fieldName] !== null
           && data[i][fieldName] !== undefined
            && data[i][fieldName] !== '') {
          result.push(data[i]);
        }
      }
      break;
    default:
      throw new Error(`Unsupported operator: ${operator}`);
  }

  return result;
}

export default filterData;
