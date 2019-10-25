const identity = (x) => x;
export function mergeSorted(arrays, predicate, desc) {
    // determine predicate function
    let predicateFn;
    if (!predicate) {
        predicateFn = identity;
    }
    else if (typeof predicate === 'string') {
        predicateFn = (item) => item[predicate];
    }
    else {
        predicateFn = predicate;
    }
    // determine mergeSortedPairs function
    const mergePair = desc ? mergeSortedPairDesc : mergeSortedPair;
    // console.log('initial arrays', arrays);
    while (arrays.length > 1) { // while there are pairs to be merged, merge pairs
        const result = new Array(Math.ceil(arrays.length / 2)); // result is an array containing the merged pairs
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
export function mergeSortedPair(array1, array2, predicateFn) {
    let i1 = 0;
    let i2 = 0;
    let array1Continues = i1 < array1.length;
    let array2Continues = i2 < array2.length;
    let prop1 = array1Continues && predicateFn(array1[i1]);
    let prop2 = array2Continues && predicateFn(array2[i2]);
    let result = [];
    while (array1Continues && array2Continues) {
        if (prop1 <= prop2) {
            result.push(array1[i1]);
            i1++;
            array1Continues = i1 < array1.length;
            prop1 = array1Continues && predicateFn(array1[i1]);
        }
        else { // prop1 > prop2
            result.push(array2[i2]);
            i2++;
            array2Continues = i2 < array2.length;
            prop2 = array2Continues && predicateFn(array2[i2]);
        }
    }
    // append the rest of either array1 or array2
    if (array1Continues) {
        result = result.concat(array1.slice(i1));
    }
    else if (array2Continues) {
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
export function mergeSortedPairDesc(array1, array2, predicateFn) {
    let i1 = 0;
    let i2 = 0;
    let array1Continues = i1 < array1.length;
    let array2Continues = i2 < array2.length;
    let prop1 = array1Continues && predicateFn(array1[i1]);
    let prop2 = array2Continues && predicateFn(array2[i2]);
    let result = [];
    while (array1Continues && array2Continues) {
        if (prop1 >= prop2) {
            result.push(array1[i1]);
            i1++;
            array1Continues = i1 < array1.length;
            prop1 = array1Continues && predicateFn(array1[i1]);
        }
        else { // prop1 < prop2
            result.push(array2[i2]);
            i2++;
            array2Continues = i2 < array2.length;
            prop2 = array2Continues && predicateFn(array2[i2]);
        }
    }
    // append the rest of either array1 or array2
    if (array1Continues) {
        result = result.concat(array1.slice(i1));
    }
    else if (array2Continues) {
        result = result.concat(array2.slice(i2));
    }
    // else both arrays are finished
    return result;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyZ2Utc29ydGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9tZXJnZS1zb3J0ZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxRQUFRLEdBQUcsQ0FBSSxDQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztBQXlCaEMsTUFBTSxVQUFVLFdBQVcsQ0FDekIsTUFBYSxFQUNiLFNBQTRDLEVBQzVDLElBQWM7SUFHZCwrQkFBK0I7SUFDL0IsSUFBSSxXQUEyQixDQUFDO0lBQ2hDLElBQUksQ0FBQyxTQUFTLEVBQUU7UUFDZCxXQUFXLEdBQUcsUUFBZSxDQUFDO0tBQy9CO1NBQU0sSUFBSSxPQUFPLFNBQVMsS0FBSyxRQUFRLEVBQUU7UUFDeEMsV0FBVyxHQUFHLENBQUMsSUFBTyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDNUM7U0FBTTtRQUNMLFdBQVcsR0FBRyxTQUFTLENBQUM7S0FDekI7SUFFRCxzQ0FBc0M7SUFDdEMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDO0lBRS9ELHlDQUF5QztJQUV6QyxPQUFPLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLEVBQUUsa0RBQWtEO1FBQzVFLE1BQU0sTUFBTSxHQUFHLElBQUksS0FBSyxDQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsaURBQWlEO1FBQzlHLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxzREFBc0Q7WUFDakcsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FB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