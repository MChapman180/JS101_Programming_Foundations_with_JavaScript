// Write a function that takes one argument, a positive integer, and returns a 
//string of alternating '1's and '0's, always starting with a '1'. The length of 
//the string should match the given integer.

// Examples:

// Copy Code
console.log(stringy(6));    // "101010"
console.log(stringy(9));    // "101010101"
console.log(stringy(4));    // "1010"
console.log(stringy(7));    // "1010101"



function stringy(num) {
  let newStr = '';
  for (let index = 0; index < num; index++) {
    if (newStr[index -1] !== '1') {
      newStr += '1';
    } else {
      newStr += '0';
    }
  }
  return newStr;
}