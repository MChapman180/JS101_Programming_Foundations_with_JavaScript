let readline = require('readline-sync');

//Log all odd numbers from 1 to 99, inclusive, to the console. 
//Log all numbers on separate lines.
// create a while loop starting at 1 going up to 99
//create a number variable outside the while loop initialized to 1
// while loop should be while number < 100
// number + 1
//log each number while iterating through

// function logOdd() {
//   let num = 1;
//   while(num < 100) {
//     if(num % 2 === 1) {
//     console.log(num);
//     }
//     num += 1;
//   }
// }

// logOdd();


function logOdd(lowest, highest) {
for(let i = lowest; i <= highest; i += 1) {
  console.log(i)
  if(i % 2 !== 0) {
console.log(i)
}
}
}
console.log('what should the highest and lowest numbers be? enter lowest followed by a space then highest')
let n = readline.question();
let [lowest, highest] = n.split(' ');
console.log(logOdd(lowest, highest))
