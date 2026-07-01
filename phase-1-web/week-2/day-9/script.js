// Day 9: Arrays & Objects

// Challenge 21: Store Multiple Values in one Variable using JavaScript Arrays
var myArray = ["John", 23];

// Challenge 22: Nest one Array within Another Array
var myArray = [["Bulls", 23], ["Lakers", 24]];

// Challenge 23: Access Array Data with Indexes
var myArray = [50, 60, 70];
var myData = myArray[0]; // myData should equal 50

// Challenge 24: Modify Array Data With Indexes
var myArray = [18, 64, 99];
myArray[1] = 45; // myArray is now [18, 45, 99]

// Challenge 25: Access Multi-Dimensional Arrays With Indexes
var myArray = [[1,2,3], [4,5,6], [7,8,9], [[10,11,12], 13, 14]];
var myData = myArray[2][1]; // myData should equal 8

// Challenge 26: Manipulate Arrays With push()
var myArray = [["John", 23], ["cat", 2]];
myArray.push(["dog", 3]); // Adds ["dog", 3] to the end

// Challenge 27: Manipulate Arrays With pop()
var myArray = [["John", 23], ["cat", 2]];
var removedFromMyArray = myArray.pop(); // Removes ["cat", 2]

// Challenge 28: Manipulate Arrays With shift()
var myArray = [["John", 23], ["dog", 3]];
var removedFromMyArray = myArray.shift(); // Removes ["John", 23]

// Challenge 29: Manipulate Arrays With unshift()
var myArray = [["John", 23], ["dog", 3]];
myArray.shift(); // Removes ["John", 23]
myArray.unshift(["Paul", 35]); // Adds ["Paul", 35] to the beginning

// Challenge 30: Shopping List
var myList = [
  ["Cereal", 3],
  ["Milk", 2],
  ["Bananas", 3],
  ["Juice", 2],
  ["Eggs", 12]
];

// BONUS: Objects
let person = {
  name: "Michael",
  age: 27,
  country: "Nigeria",
  skills: ["HTML", "CSS", "JavaScript"]
};

console.log(person.name); // Michael
console.log(person.skills[2]); // JavaScript