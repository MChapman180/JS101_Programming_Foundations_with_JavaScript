// Write a function that takes two strings as arguments, determines the longer of
// the two strings, and then returns the result of concatenating the shorter string,
// the longer string, and the shorter string once again. You may assume
// that the strings are of different lengths.

// Examples:

// shortLongShort('abc', 'defgh');    // "abcdefghabc"
// shortLongShort('abcde', 'fgh');    // "fghabcdefgh"
// shortLongShort('', 'xyz');         // "xyz"

// input 2 strings
//output string

// check the length of both strings and add to variables longer, shorter
// longer.concat

function shortLongShort(string1, string2) {
 let short;
 let long;
 if(string1.length > string2.length) {
   short = string2;
   long = string1;
 }
 else {
   short = string1;
   long = string2;
 }
  return short.concat(long).concat(short);
}

console.log(shortLongShort('abc', 'defgh'));    // "abcdefghabc"
console.log(shortLongShort('abcde', 'fgh'));    // "fghabcdefgh"
console.log(shortLongShort('', 'xyz'));         // "xyz"