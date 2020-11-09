// Write a function that takes a positive integer, n, as an argument, and logs a right
// triangle whose sides each have n stars. The hypotenuse of the triangle (the diagonal
// side in the images below) should have one end at the lower-left of 
// the triangle, and the other end at the upper-right.

// loop from 0 to 5, adding '', if its the end of the loop or count is above 1,

function triangle(height) {
let stars = 1;
let spaces = height - 1;

while(height >  0) {
console.log(`${' '.repeat(spaces)}${'*'.repeat(stars)}`);
spaces -= 1;
stars += 1;
height -= 1;
}
}


console.log(triangle(5));



console.log(triangle(9));

