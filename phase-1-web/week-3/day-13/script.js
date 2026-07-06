// Day 13: Introduction to Node.js

// This is a comment. Node.js ignores comments.

// console.log prints text to the terminal
console.log("Hello from Node.js!");

// You can also print numbers
console.log(42);

// You can print multiple things
console.log("My name is Michael", "I am learning Node.js");

// You can use variables
const myName = "Michael";
const myAge = 27;
console.log("My name is", myName, "and I am", myAge, "years old.");

// You can do math
const sum = 10 + 5;
console.log("10 + 5 =", sum);

// You can use arrays and objects
const hobbies = ["Coding", "Reading", "Music"];
console.log("My hobbies:", hobbies);

const person = {
    name: "Michael",
    country: "Nigeria"
};
console.log("Person:", person);

// You can create functions
function greet(name) {
    return `Hello, ${name}! Welcome to Node.js.`;
}

const greeting = greet("Alice");
console.log(greeting);

// You can run multiple statements
console.log("This is line 1");
console.log("This is line 2");
console.log("This is line 3");

// You can use conditionals
const isLearning = true;
if (isLearning) {
    console.log("I am learning Node.js");
} else {
    console.log("I am not learning Node.js");
}

// You can use loops
for (let i = 1; i <= 5; i++) {
    console.log("Loop iteration:", i);
}

// You can work with arrays using forEach
const fruits = ["Apple", "Banana", "Orange"];
fruits.forEach(function(fruit) {
    console.log("I like", fruit);
});

// You can get user input from the terminal
// (We'll learn this later — for now, just use variables)

console.log("Node.js script finished successfully!");