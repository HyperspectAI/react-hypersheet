import { ObjectUnion } from '../types/index';

/*
* Moving the check for the key's existence outside of the if statement that checks the type of the value. This avoids unnecessary checks when the key doesn't exist in the object.

* Handling arrays in a separate branch, which avoids the need for the nested map function and the join call inside the map function.

* Removing the unnecessary arrow function in the map call, which improves readability.

* Removing the unnecessary else block in the last if statement, since it only contains a return statement.

*/

function getObjectValue(obj: ObjectUnion, key: string): any {
  const value = obj[key];
  if (value === undefined) {
    return undefined;
  } if (typeof value !== 'object' || value === null) {
    return value;
  } if (Array.isArray(value)) {
    return value.map((item) => getObjectValue(item, Object.keys(item)[0]))
      .join(',');
  }
  return getObjectValue(value, Object.keys(value)[0]);
}

export default getObjectValue;
