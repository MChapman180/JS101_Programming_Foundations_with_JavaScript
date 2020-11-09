// Write a function that takes a string argument and returns a new string that 
// contains the value of the original string with all consecutive duplicate 
// characters collapsed into a single character.

//go through each letter in the string, if the previous index does not match the plus one then push into a new str


// function crunch(str) {
//   //loop through the string with a for loop
// //if the new str does not contain char in the loop, then add that to the new str
// let newstr = '';
// for(let index = 0; index < str.length; index += 1) {
// let element = str[index];
//   if(element !== str[index + 1]) {
//     newstr += element;
//   } 
// }
// return newstr;
// }

function crunch(str) {
let matches = str.match(/(.)(?!\1)/g) || [];
return matches.join('');
  
}

console.log(crunch('ddaaiillyy ddoouubbllee'));    // "daily double"
console.log(crunch('4444abcabccba'));              // "4abcabcba"
console.log(crunch('ggggggggggggggg'));            // "g"
console.log(crunch('a'));                          // "a"
console.log(crunch(''));                           // ""