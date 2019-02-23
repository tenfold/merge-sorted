const identity = <T>(x: T) => x;

/**
 * Merge presorted arrays together into one sorted array.
 * @arrays array of arrays to merge
 * @param predicate leave null/undefined for identity function to be used as predicate
 * @param desc true if arrays are presorted in descending order, false if in ascending order. Defaults to false.
 */
export function mergeSorted<T>(arrays: T[][], predicate?: void, desc?: boolean): T[];
/**
 * Merge presorted arrays together into one sorted array.
 * @arrays array of arrays to merge
 * @param predicate key that refers to the property to compare the elements by
 * @param desc true if arrays are presorted in descending order, false if in ascending order. Defaults to false.
 */
export function mergeSorted<T>(arrays: T[][], predicate: string, desc?: boolean): T[];
/**
 * Merge presorted arrays together into one sorted array.
 * @arrays array of arrays to merge
 * @param predicate predicate function returning the property to compare the elements by
 * @param desc true if arrays are presorted in descending order, false if in ascending order. Defaults to false.
 *
 * Complexity is O(nloga) due to pairwise merging
 */
export function mergeSorted<T, P>(arrays: T[][], predicate: ((item: T) => P), desc?: boolean): T[];
export function mergeSorted<T, P>(
  arrays: T[][],
  predicate?: void | string | ((item: T) => P),
  desc?: boolean,
): T[] {

  // determine predicate function
  let predicateFn: (item: T) => P;
  if (!predicate) {
    predicateFn = identity as any;
  } else if (typeof predicate === 'string') {
    predicateFn = (item: T) => item[predicate];
  } else {
    predicateFn = predicate;
  }

  // determine mergeSortedPairs function
  const mergePair = desc ? mergeSortedPairDesc : mergeSortedPair;

  // console.log('initial arrays', arrays);

  while (arrays.length > 1) { // while there are pairs to be merged, merge pairs
    const result = new Array<T[]>(Math.ceil(arrays.length / 2)); // result is an array containing the merged pairs
    for (let i = 0; i < arrays.length; i += 2) { // i is always the first index in the pair and is even
      const a1 = arrays[i];
      const a2 = arrays[i + 1];
      const merged = a2 ? mergePair(a1, a2, predicateFn) : a1;
      result[i / 2] = merged; // correct because i is always even
      // result.push(merged); // can be used if we don't initialise the length of the array
    }
    arrays = result;
    // console.log('arrays after', arrays);
  }

  return arrays[0] || []; // arrays.length === 1 || arrays.length === 0
}

/**
 * Merges two arrays sorted in ascending order. Complexity is O(n1 + n2)
 * @param array1
 * @param array2
 * @param predicateFn
 */
export function mergeSortedPair<T, P>(
  array1: T[],
  array2: T[],
  predicateFn: (item: T) => P,
): T[] {
    let i1 = 0;
    let i2 = 0;
    let array1Continues = i1 < array1.length;
    let array2Continues = i2 < array2.length;
    let prop1 = array1Continues && predicateFn(array1[i1]);
    let prop2 = array2Continues && predicateFn(array2[i2]);
    let result: T[] = [];

    while (array1Continues && array2Continues) {
      if (prop1 <= prop2) {
        result.push(array1[i1]);
        i1++;
        array1Continues = i1 < array1.length;
        prop1 = array1Continues && predicateFn(array1[i1]);
      } else { // prop1 > prop2
        result.push(array2[i2]);
        i2++;
        array2Continues = i2 < array2.length;
        prop2 = array2Continues && predicateFn(array2[i2]);
      }
    }

    // append the rest of either array1 or array2
    if (array1Continues) {
      result = result.concat(array1.slice(i1));
    } else if (array2Continues) {
      result = result.concat(array2.slice(i2));
    }
    // else both arrays are finished

    return result;
}

/**
 * Merges two arrays sorted in descending order. Complexity is O(n1 + n2)
 * @param array1
 * @param array2
 * @param predicateFn
 */
export function mergeSortedPairDesc<T, P>(
  array1: T[],
  array2: T[],
  predicateFn: (item: T) => P,
): T[] {
  let i1 = 0;
  let i2 = 0;
  let array1Continues = i1 < array1.length;
  let array2Continues = i2 < array2.length;
  let prop1 = array1Continues && predicateFn(array1[i1]);
  let prop2 = array2Continues && predicateFn(array2[i2]);
  let result: T[] = [];

  while (array1Continues && array2Continues) {
    if (prop1 >= prop2) {
      result.push(array1[i1]);
      i1++;
      array1Continues = i1 < array1.length;
      prop1 = array1Continues && predicateFn(array1[i1]);
    } else { // prop1 < prop2
      result.push(array2[i2]);
      i2++;
      array2Continues = i2 < array2.length;
      prop2 = array2Continues && predicateFn(array2[i2]);
    }
  }

  // append the rest of either array1 or array2
  if (array1Continues) {
    result = result.concat(array1.slice(i1));
  } else if (array2Continues) {
    result = result.concat(array2.slice(i2));
  }
  // else both arrays are finished

  return result;
}
