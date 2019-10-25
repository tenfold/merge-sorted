"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var identity = function (x) { return x; };
function mergeSorted(arrays, predicate, desc) {
    // determine predicate function
    var predicateFn;
    if (!predicate) {
        predicateFn = identity;
    }
    else if (typeof predicate === 'string') {
        predicateFn = function (item) { return item[predicate]; };
    }
    else {
        predicateFn = predicate;
    }
    // determine mergeSortedPairs function
    var mergePair = desc ? mergeSortedPairDesc : mergeSortedPair;
    // console.log('initial arrays', arrays);
    while (arrays.length > 1) { // while there are pairs to be merged, merge pairs
        var result = new Array(Math.ceil(arrays.length / 2)); // result is an array containing the merged pairs
        for (var i = 0; i < arrays.length; i += 2) { // i is always the first index in the pair and is even
            var a1 = arrays[i];
            var a2 = arrays[i + 1];
            var merged = a2 ? mergePair(a1, a2, predicateFn) : a1;
            result[i / 2] = merged; // correct because i is always even
            // result.push(merged); // can be used if we don't initialise the length of the array
        }
        arrays = result;
        // console.log('arrays after', arrays);
    }
    return arrays[0] || []; // arrays.length === 1 || arrays.length === 0
}
exports.mergeSorted = mergeSorted;
/**
 * Merges two arrays sorted in ascending order. Complexity is O(n1 + n2)
 * @param array1
 * @param array2
 * @param predicateFn
 */
function mergeSortedPair(array1, array2, predicateFn) {
    var i1 = 0;
    var i2 = 0;
    var array1Continues = i1 < array1.length;
    var array2Continues = i2 < array2.length;
    var prop1 = array1Continues && predicateFn(array1[i1]);
    var prop2 = array2Continues && predicateFn(array2[i2]);
    var result = [];
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
exports.mergeSortedPair = mergeSortedPair;
/**
 * Merges two arrays sorted in descending order. Complexity is O(n1 + n2)
 * @param array1
 * @param array2
 * @param predicateFn
 */
function mergeSortedPairDesc(array1, array2, predicateFn) {
    var i1 = 0;
    var i2 = 0;
    var array1Continues = i1 < array1.length;
    var array2Continues = i2 < array2.length;
    var prop1 = array1Continues && predicateFn(array1[i1]);
    var prop2 = array2Continues && predicateFn(array2[i2]);
    var result = [];
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
exports.mergeSortedPairDesc = mergeSortedPairDesc;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyZ2Utc29ydGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9tZXJnZS1zb3J0ZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNLFFBQVEsR0FBRyxVQUFJLENBQUksSUFBSyxPQUFBLENBQUMsRUFBRCxDQUFDLENBQUM7QUF5QmhDLFNBQWdCLFdBQVcsQ0FDekIsTUFBYSxFQUNiLFNBQTRDLEVBQzVDLElBQWM7SUFHZCwrQkFBK0I7SUFDL0IsSUFBSSxXQUEyQixDQUFDO0lBQ2hDLElBQUksQ0FBQyxTQUFTLEVBQUU7UUFDZCxXQUFXLEdBQUcsUUFBZSxDQUFDO0tBQy9CO1NBQU0sSUFBSSxPQUFPLFNBQVMsS0FBSyxRQUFRLEVBQUU7UUFDeEMsV0FBVyxHQUFHLFVBQUMsSUFBTyxJQUFLLE9BQUEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFmLENBQWUsQ0FBQztLQUM1QztTQUFNO1FBQ0wsV0FBVyxHQUFHLFNBQVMsQ0FBQztLQUN6QjtJQUVELHNDQUFzQztJQUN0QyxJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUM7SUFFL0QseUNBQXlDO0lBRXpDLE9BQU8sTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsRUFBRSxrREFBa0Q7UUFDNUUsSUFBTSxNQUFNLEdBQUcsSUFBSSxLQUFLLENBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxpREFBaUQ7UUFDOUcsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLHNEQUFzRDtZQUNqRyxJQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckIsSUFBTSxFQUFFLEdBQUcs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