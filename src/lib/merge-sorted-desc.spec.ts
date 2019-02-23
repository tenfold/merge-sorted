import test from 'ava';
import { mergeSorted } from './merge-sorted';

// same tests as for ascending version, but with all arrays reversed
test(`should merge empty arrays`, (t) => {
  t.deepEqual(mergeSorted(
    [
      [],
      [],
    ],
    null,
    true,
  ), []);
});

test(`should merge 0 arrays`, (t) => {
  t.deepEqual(mergeSorted(
    [
    ],
    null,
    true,
  ), []);
});

test(`should merge one array`, (t) => {
  t.deepEqual(mergeSorted(
    [
      [0, 1, 2, 3].reverse()
    ],
    null,
    true,
  ), [0, 1, 2, 3].reverse());
});

test(`should merge two arrays`, (t) => {
  t.deepEqual(mergeSorted(
    [
      [1, 4, 6, 7, 8].reverse(),
      [0, 2, 3, 5].reverse(),
    ],
    null,
    true,
  ), [0, 1, 2, 3, 4, 5, 6, 7, 8].reverse());
  t.deepEqual(mergeSorted(
    [
      [0, 2, 3, 5].reverse(),
      [1, 4, 6, 7, 8].reverse(),
    ],
    null,
    true,
  ), [0, 1, 2, 3, 4, 5, 6, 7, 8].reverse());
});

test(`should merge three arrays`, (t) => {
  t.deepEqual(mergeSorted(
    [
      [1, 4, 6, 7].reverse(),
      [2, 3].reverse(),
      [0, 5, 8].reverse(),
    ],
    null,
    true,
  ), [0, 1, 2, 3, 4, 5, 6, 7, 8].reverse());
});

test(`should merge six arrays`, (t) => {
  t.deepEqual(mergeSorted(
    [
      [1, 4, 6, 13].reverse(),
      [2, 14].reverse(),
      [0, 5, 8].reverse(),
      [7, 9, 10].reverse(),
      [3, 11].reverse(),
      [12, 15].reverse(),
    ],
    null,
    true,
  ), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].reverse());
});

test('should be usable to emulate merge sort', (t) => {
  const unsorted = [5, 6, 10, 15, 11, 1, 14, 13, 2, 7, 4, 12, 9, 0, 8, 3].reverse();
  const arrayOfArrays = unsorted.map(x => [x]);
  t.deepEqual(mergeSorted(
    arrayOfArrays,
    null,
    true,
  ), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].reverse());
});

test(`should merge using string predicates`, (t) => {
  // tslint:disable-next-line:variable-name
  const transform = (number: number) => {
    return { number };
  };
  const untransform = (object: { number: number }) => object.number;
  t.deepEqual(mergeSorted(
    [
      [1, 4, 6, 7].map(transform).reverse(),
      [2, 3].map(transform).reverse(),
      [0, 5, 8].map(transform).reverse(),
    ],
    'number',
    true,
  ).map(untransform), [0, 1, 2, 3, 4, 5, 6, 7, 8].reverse());
});

test(`should merge using function predicates`, (t) => {
  // tslint:disable-next-line:variable-name
  const transform = (number: number) => {
    return { number };
  };
  const untransform = (object: { number: number }) => object.number;
  const predicate = untransform;
  t.deepEqual(mergeSorted(
    [
      [1, 4, 6, 7].map(transform).reverse(),
      [2, 3].map(transform).reverse(),
      [0, 5, 8].map(transform).reverse(),
    ],
    predicate,
    true,
  ).map(untransform), [0, 1, 2, 3, 4, 5, 6, 7, 8].reverse());
});

test(`should merge stably - original order of elements in each subarray should be preserved`, (t) => {
  interface IObject { number: number, originalIndex: number };
  // tslint:disable-next-line:variable-name
  const transform = (number: number, originalIndex: number) => {
    return { number, originalIndex };
  };
  const predicate = (object: IObject) => object.number;
  t.deepEqual(mergeSorted<IObject, number>(
    [
      [1, 4].map(transform).reverse(),
      [0, 2, 2, 2, 3].map(transform).reverse(), // multiple 2s
    ],
    predicate,
    true,
  ), [
    {
      number: 0,
      originalIndex: 0,
    },
    {
      number: 1,
      originalIndex: 0,
    },
    {
      number: 2,
      originalIndex: 1,
    },
    {
      number: 2,
      originalIndex: 2,
    },
    {
      number: 2,
      originalIndex: 3,
    },
    {
      number: 3,
      originalIndex: 4,
    },
    {
      number: 4,
      originalIndex: 1,
    },
  ].reverse());
});

test(`should merge items from first arrays preferably when item properties are equal`, (t) => {
  interface IObject { number: number, arrayIndex: number };
  // tslint:disable-next-line:variable-name
  const transform = (number: number, arrayIndex: number) => {
    return { number, arrayIndex };
  };
  const predicate = (object: IObject) => object.number;
  t.deepEqual(mergeSorted<IObject, number>(
    // multiple 4s
    [
      [1, 4, 6, 7].map((n) => transform(n, 0)).reverse(),
      [2, 3, 4].map((n) => transform(n, 1)).reverse(),
      [0, 4, 5, 8].map((n) => transform(n, 2)).reverse(),
    ].reverse(),
    predicate,
    true,
  ), [
    {
      arrayIndex: 2,
      number: 0,
    },
    {
      arrayIndex: 0,
      number: 1,
    },
    {
      arrayIndex: 1,
      number: 2,
    },
    {
      arrayIndex: 1,
      number: 3,
    },
    {
      arrayIndex: 0, // preference to first array
      number: 4,
    },
    {
      arrayIndex: 1, // preference to second array
      number: 4,
    },
    {
      arrayIndex: 2, // array from third array last
      number: 4,
    },
    {
      arrayIndex: 2,
      number: 5,
    },
    {
      arrayIndex: 0,
      number: 6,
    },
    {
      arrayIndex: 0,
      number: 7,
    },
    {
      arrayIndex: 2,
      number: 8,
    },
  ].reverse());
});
