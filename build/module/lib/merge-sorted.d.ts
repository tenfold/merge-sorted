/**
 * Merge presorted arrays together into one sorted array.
 * @arrays array of arrays to merge
 * @param predicate leave null/undefined for identity function to be used as predicate
 * @param desc true if arrays are presorted in descending order, false if in ascending order. Defaults to false.
 */
export declare function mergeSorted<T>(arrays: T[][], predicate?: void, desc?: boolean): T[];
/**
 * Merge presorted arrays together into one sorted array.
 * @arrays array of arrays to merge
 * @param predicate key that refers to the property to compare the elements by
 * @param desc true if arrays are presorted in descending order, false if in ascending order. Defaults to false.
 */
export declare function mergeSorted<T>(arrays: T[][], predicate: string, desc?: boolean): T[];
/**
 * Merge presorted arrays together into one sorted array.
 * @arrays array of arrays to merge
 * @param predicate predicate function returning the property to compare the elements by
 * @param desc true if arrays are presorted in descending order, false if in ascending order. Defaults to false.
 *
 * Complexity is O(nloga) due to pairwise merging
 */
export declare function mergeSorted<T, P>(arrays: T[][], predicate: ((item: T) => P), desc?: boolean): T[];
/**
 * Merges two arrays sorted in ascending order. Complexity is O(n1 + n2)
 * @param array1
 * @param array2
 * @param predicateFn
 */
export declare function mergeSortedPair<T, P>(array1: T[], array2: T[], predicateFn: (item: T) => P): T[];
/**
 * Merges two arrays sorted in descending order. Complexity is O(n1 + n2)
 * @param array1
 * @param array2
 * @param predicateFn
 */
export declare function mergeSortedPairDesc<T, P>(array1: T[], array2: T[], predicateFn: (item: T) => P): T[];
