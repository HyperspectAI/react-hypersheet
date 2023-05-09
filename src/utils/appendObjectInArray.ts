/*
Using a for...in loop instead of Object.keys and forEach to iterate over the
keys of the first object in the array. This avoids creating unnecessary
intermediate arrays and function calls.

Using the spread operator to create a new array instead of modifying the
original array. This avoids potential side effects and makes the function more pure.

Computing the ID of the new object using the length of the array instead of
searching for the maximum ID value. This avoids the need to iterate over the
entire array and should be faster for large arrays.

*/

function appendObjectInArray(arr: any[]) {
  const newObjWithId: any = { id: arr.length + 1 };
  // eslint-disable-next-line no-restricted-syntax
  for (const key in arr[0]) {
    if (key !== 'id') {
      newObjWithId[key] = key;
    }
  }
  return [...arr, newObjWithId];
}

export default appendObjectInArray;
