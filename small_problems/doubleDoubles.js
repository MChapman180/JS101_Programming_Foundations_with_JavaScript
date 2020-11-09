function twice(num) {
// if the number is not even, multiple the number by 2
// if the numbers length / 2, then sliced first 2, slice second 2 === return the numbers
if(String(num).length % 2 === 1) {
  return num * 2;
}
let halfway = String(num).length / 2;
if(String(num).slice(0, halfway) === String(num).slice(halfway)) {
  return num;
}
else {
  return num * 2;
} 
}



console.log(twice(37));          // 74
console.log(twice(44));          // 44
console.log(twice(334433));      // 668866
console.log(twice(444));         // 888
console.log(twice(107));         // 214
console.log(twice(103103));      // 103103
console.log(twice(3333));        // 3333
console.log(twice(7676));        // 7676