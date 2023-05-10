import { ObjectUnion } from '../types';

/*
This implementation uses a stack to keep track of the objects to be processed, instead of calling itself recursively. It starts by pushing the root object onto the stack with an empty prefix, and then loops over the stack until it is empty. In each iteration of the loop, it pops the top item from the stack, and iterates over its keys. If a key's value is an object, it pushes it onto the stack with the new prefix. Otherwise, it adds the key and its value to the result object. Once the stack is empty, it returns the flattened object.
*/
function flattenObj(obj: ObjectUnion): ObjectUnion {
  const stack = [{ obj, prefix: '' }];
  const result: ObjectUnion = {};

  while (stack.length) {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { obj, prefix } = stack.pop()!;
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(obj)) {
      const newKey = prefix ? `${prefix}.${key}` : key;
      if (typeof value === 'object' && value !== null) {
        stack.push({ obj: value, prefix: newKey });
      } else {
        result[newKey] = value;
      }
    }
  }

  return result;
}

export default flattenObj;
