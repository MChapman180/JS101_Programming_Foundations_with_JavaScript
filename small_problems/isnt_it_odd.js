//Write a function that takes one integer argument, which may be positive, 
//negative, or zero. This method returns true if the number's 
//absolute value is odd. You may assume that the argument is a valid integer value.

// input - positive or negative or zero integer
// check if tha value is odd
//output - true or false, a boolean value if the number is odd
//rules: explicit requirements:
//algorithm
//make the number an absolute value using math.absolute 
//check if the number is odd using modulus operator % and that it does not equal 0 when divided by 2/
//return true or false

function isOdd(num) {
  return Math.abs(num) % 2 !== 0; 
}


console.log(isOdd(2)); // => false
console.log(isOdd(5)); // => true
console.log(isOdd(-17)); // => true
console.log(isOdd(-8)); // => false
console.log(isOdd(0)); // => false
console.log(isOdd(7)); // => true