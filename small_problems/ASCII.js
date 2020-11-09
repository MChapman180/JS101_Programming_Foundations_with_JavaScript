// // ASCII String Value
// // Write a function that determines and returns the ASCII string value of a 
// string passed in as an argument. The ASCII string value is the sum of the ASCII 
// values of every character in the string. (You may use String.prototype.charCodeAt() 
// to determine the ASCII value of a character.)

// Examples:


function asciiValue(val) {
let sum = 0;
  for(let i = 0; i < val.length; i++) {
    sum += val.charCodeAt(i);
  }
  return sum;
}
 console.log(asciiValue('Four score'));         // 984
 console.log(asciiValue('Launch School'));      // 1251
 console.log(asciiValue('a'));                  // 97
 console.log(asciiValue(''));                   // 0