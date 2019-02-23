# merge-sorted

Merge n arrays, presorted in either ascending or descending order.

Preferable to concatenating the arrays and the resorting if performance is a concern.

# Examples

```
/*
 * Merge three presorted arrays
 */
mergeSorted([
  [2, 3, 5],
  [1, 8],
  [4, 6, 7],
]); // => [1, 2, 3, 4, 5, 6, 7, 8]

/*
 * Merge arrays of presorted objects using a string predicate
 */
mergeSorted([
  [{ name: 'Amy' }, { name: 'Luke' }],
  [{ name: 'Jeremy' }, { name: 'Rory' }],
], 'name'); // => [{ name: 'Amy' }, { name: 'Jeremy' }, { name: 'Luke' }, { name: 'Rory' }]

/*
 * Merge arrays of presorted objects using a function predicate
 */
mergeSorted([
  [{ subject: 'computer science', rating: 'awesome' }, { subject: 'biology', rating: 'great' }],
  [{ subject: 'literature', rating: 'meh' }],
], (o) => {
  switch (o.rating) {
    case 'awesome': return 1;
    case 'great': return 2;
    case 'meh': return 3;
  }
}); // => [{ subject: 'computer science', rating: 'awesome' }, { subject: 'biology', rating: 'great' }, { subject: 'literature', rating: 'meh' }]

/*
 * Merge arrays presorted in descending order
 */
mergeSorted([
  [{ name: 'Luke' }, { name: 'Amy' }],
  [{ name: 'Rory' }, { name: 'Jeremy' }],
], 'name', true); // => [{ name: 'Rory' }, { name: 'Luke' }, { name: 'Jeremy' }, { name: 'Amy' }]

```

# Parameters
```
/**
 * Merge presorted arrays together into one sorted array.
 *
 * @param arrays: Array of arrays to merge.
 * @param predicate: Optional. Function or string referring to the property to compare elements by. Defaults to identity.
 * @param desc: Optional. True if arrays are presorted in descending order, false if in ascending order. Defaults to false.
 *
 * Complexity is O(nloga) where n is the total number of elements; a is the total number of arrays to merge.
 */
mergeSorted(arrays, predicate, desc)
```
