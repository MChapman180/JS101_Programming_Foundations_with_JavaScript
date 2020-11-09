// Small ProblemsEasy 2The End Is Near But Not Here
// Give us your feedback
// The End Is Near But Not Here
// Write a function that returns the next to last word in the String passed to it as an argument.

// Words are any sequence of non-blank characters.

// You may assume that the input String will always contain at least two words.

// Examples:

// Copy Code

// console.log(penultimate("Launch School is great!") === "is"); // logs true






function penultimate(word, pen) {
  let arr = word.split(' ')

  return String(arr[arr.length -2]) === String(pen); 
}

console.log(penultimate("last word", 'last')); // logs true

function middleWord(sentence) {
let arr = sentence.split(' ');
if(arr.length > 2 && arr.every(element => typeof element === 'string' ))
return arr[Math.floor(arr.length / 2)];
}

console.log(middleWord('    '));