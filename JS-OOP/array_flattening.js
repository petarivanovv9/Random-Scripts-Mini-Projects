Array.prototype.flatten = function() {

  flattenArrayOfArrays = (array, result) => {
    if (!result) {
      result = [];
    }
    for (var i = 0; i < array.length; i++) {
      if (Array.isArray(array[i])) {
        flattenArrayOfArrays(array[i], result);
      } else {
        result.push(array[i]);
      }
    }

    return result;
  }

  return flattenArrayOfArrays(this);
};


//
// Examples
//

const array = [1, 2, ["abc", "aaa", "bbb"], 4, 4.5, [[true, 1, 2], [3, false, 4]], 10];

console.log(array);
console.log(array.flatten());
