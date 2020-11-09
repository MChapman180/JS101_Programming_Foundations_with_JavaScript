// // Convert a Signed Number to a String!
// // In the previous exercise, you developed a function that converts non-negativ
// e numbers to strings. In this exercise, you're going to extend that function by 
// adding the ability to represent negative numbers as well.

// // Write a function that takes an integer, and converts it to a string representation.

// // You may not use any of the standard conversion functions available 
// in JavaScript, such as String() and Number.prototype.toString().
// You may, however, use integerToString() from the previous exercise.

// // You might also want to check the Math.sign() function.

// // Examples

//convert all number types to strings
// take the number and check if it is negative or positive
//if positive - start chopping off each digit from the end

// if negative
function signedIntegerToString(num) {

function IntegerToString(num) {
//  create digit list
  const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  //create variable for resulting string
  let result = ''
 // first get the last digit of the number by using modules remained 10
 let lastDigit = num % 10;
 // add that to the new str result

//take off the last digit from the integer by diviging by 10 and flooring it

// use a do while loop to achieve this



function signedIntegerToString(number) {
let result = '';
  if(number < 0) {
 number = integerToString(Math.abs(number))
result = '-' + number + result;
return result;
} else if(number > 0) {
  return '+' + integerToString(number);
}
else {
return integerToString(number);
}
}





// function integerToString(num, result = '') {
//   const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
//   if(num === 0) {
//     return result || DIGITS[0];
//   }
//   else {
//     let remainder = num % 10;
 
//     return integerToString(num = Math.floor(num / 10), DIGITS[remainder] + result);
  
//   }
//   }


// console.log(signedIntegerToString(4321)) // === "+4321");
// console.log(signedIntegerToString(-123)) //=== "-123");
// console.log(signedIntegerToString(0)) //=== "0");

console.log(integerToString(4321));      // "4321"
console.log(integerToString(0));         // "0"
console.log(integerToString(5000));      // "5000"
console.log(integerToString(1234567890));      // "1234567890"