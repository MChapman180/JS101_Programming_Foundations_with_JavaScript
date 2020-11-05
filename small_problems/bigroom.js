// Build a program that asks the user to enter the length and 
// width of a room in meters, and then logs the area o
// f the room to the console in both square meters and square feet.

// Note: 1 square meter == 10.7639 square feet

// Do not worry about validating the input at this time. Use 
//the readlineSync.prompt method to collect user input.

// Example:

// Enter the length of the room in meters:
// 10
// Enter the width of the room in meters:
// 7
// The area of the room is 70.00 square meters (753.47 square feet).
// //ask the user for input using readline

// input will be a string which should be added to a variable
// parsfloat the number of the string 
// times the width and area
// add another variable for sqft, times square meters by 10.76

//output - a string with tje numbers included
let readline = require('readline-sync');
const metreTosqft = 10.7639;
const sqftToMetre =  0.3048;

function room(width, length, measurement) {
let areaMeters;
let sqftArea;
if(measurement === 'metres') {
areaMeters = parseFloat(width) * parseFloat(length);
sqftArea = areaMeters * metreTosqft
} else {
sqftArea = parseFloat(width) * parseFloat(length);
areaMeters = sqftArea * sqftToMetre;  
}
return [areaMeters, sqftArea];
}

function displayMeters(area) {
console.log(`The area of the room is ${area[0].toFixed(2)} square meters (${area[1].toFixed(2)} square feet)`);
}

function askUser() {
  console.log(`would you like to type the measurements in 'metres' or 'feet'?`)
  let answer = readline.prompt();
  return answer;
}

function askMeasurements(measurement) {
console.log(`Enter the length of the room in ${measurement}:`);
let length = readline.question().toLowerCase();
console.log(`Enter the width of the room in ${measurement}:`);
let width = readline.question().toLowerCase();  
return [length, width];
  
}


let measurement = askUser();
let [width, length] = askMeasurements(measurement);

let area = room(width, length, measurement);

displayMeters(area);
