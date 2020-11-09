
// input string of digits
// output integer/number

function stringToInteger(numbers) {
  let number = numbers[0];
  for(let i = 1; i < numbers.length; i++) {
  let num = numbers[i];
number += num;
  }
return number;
}

function stringToSignedInteger(str) {
let num;
if(str.startsWith('-')) {
num = stringToInteger(str.slice(1));
num = (num - num) - num;
}
else if(str.startsWith('+')) {
  num = stringToInteger(str.slice(1));
   
}
else {
  num = stringToInteger(str);
}
return num;
}

console.log(stringToSignedInteger("4321")) // === 4321); // logs true
console.log(stringToSignedInteger("-570")) //=== -570); // logs true
console.log(stringToSignedInteger("+100")) // === 100); // logs true












// Convert a String to a Number!
// The parseInt() method converts a string of numeric characters (including an 
// optional plus or minus sign) to an integer. The method takes 2 arguments where 
// the first argument is the string we want to convert and the second argument 
// should always be 10 for our purposes. parseInt() and the Number() method behave
// similarly. In this exercise, you will create a function that does the same thing.

// Write a function that takes a String of digits, and returns the appropriate 
// number as an integer. You may not use any of the methods mentioned above.

// For now, do not worry about leading + or - signs, nor should you worry about
// invalid characters; assume all characters will be numeric.

// You may not use any of the standard conversion methods available in JavaScript,
// such as String() and Number(). Your function should do this the old-fashioned 
// way and calculate the result by analyzing the characters in the string.

// Examples


// function stringToInteger(numbers) {
//   //create a number variable
//   let number = numbers[0];
//   // loop over each string number in a for loop.
//   for(let i = 1; i < numbers.length; i++) {
//   // if a string number is a number (type of)
//   let num = numbers[i];
// number += num;
  
//   }
// return number;
// }

// function hexadecimalToInteger(str) {
//   const digits = {
//     A: 10,
//     B: 11,
//     C: 12,
//     D: 13,
//     E: 14,
//     F: 15
//   };
//   let power = 0;
//   let arr = [];
//   for (let index = str.length - 1; index >= 0; index--) {
//     let hex = str[index];
//     if (hex === hex.toLowerCase()) hex = hex.toUpperCase();
//     arr.push((digits[hex] || hex) * ((16 ** power)));
//     power += 1;
//   }
//   return arr.reduce((total, current) => total + current, 0);
// }

// console.log(hexadecimalToInteger('4D9f'));


// console.log(stringToInteger("4321")) //4321); // logs true
// console.log(stringToInteger("570")) //570); // logs true