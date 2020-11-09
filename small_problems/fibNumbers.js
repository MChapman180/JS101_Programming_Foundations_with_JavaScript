// The Fibonacci series is a series of numbers (1, 1, 2, 3, 5, 8, 13, 21, ...) 
// such that the first two numbers are 1 by definition, and each subsequent number
// is the sum of the two previous numbers. This series appears 
// throughout the natural world.

// Computationally, the Fibonacci series is a simple series, but the results 
// grow at an incredibly rapid rate. For example, the 100th Fibonacci number 
// is 354,224,848,179,261,915,075—that's enormous, especially considering that 
// it takes six iterations just to find the first 2-digit Fibonacci number.

// Write a function that calculates and returns the index of the first Fibonacci
// number that has the number of digits specified by the argument. (The first 
// Fibonacci number has an index of 1.)

// You may assume that the argument is always an integer greater than or equal to 2.

// Examples

function findFibonacciIndexByLength(num) {
  let fib = [0, 1];
  while (true) {
    if (String(fib[fib.length - 2] + fib[fib.length - 1]).length > 16) {
      console.log(`Error - this number is too large so may not be accurate`);
    }
    fib.push(fib[fib.length - 2] + fib[fib.length - 1]);

    if (String(fib[fib.length - 1]).length === num) {
      return fib.indexOf(fib[fib.length - 1]);
    }
  }
}


console.log(findFibonacciIndexByLength(2));       // 7
console.log(findFibonacciIndexByLength(10));      // 45
console.log(findFibonacciIndexByLength(17));      // 74

// Don't try any higher values until you read the solution Discussion

