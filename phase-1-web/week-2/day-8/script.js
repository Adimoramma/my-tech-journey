// Day 8: JavaScript Functions

// Challenge 1: Write Reusable JavaScript with Functions
function reusableFunction() {
  console.log("Hi World");
}
reusableFunction();

// Challenge 2: Passing Values to Functions with Arguments
function functionWithArgs(a, b) {
  console.log(a + b);
}
functionWithArgs(1, 2);
functionWithArgs(7, 9);

// Challenge 3: Return a Value from a Function with Return
function timesFive(num) {
  return num * 5;
}
const answer = timesFive(5);

// Challenge 4: Global Scope and Functions
const myGlobal = 10;

function fun1() {
  oopsGlobal = 5;
}

function fun2() {
  let output = "";
  if (typeof myGlobal != "undefined") {
    output += "myGlobal: " + myGlobal;
  }
  if (typeof oopsGlobal != "undefined") {
    output += " oopsGlobal: " + oopsGlobal;
  }
  console.log(output);
}

// Challenge 5: Local Scope and Functions
function myLocalScope() {
  const myVar = 10;
  console.log('inside myLocalScope', myVar);
}
myLocalScope();

// Challenge 6: Global vs Local Scope in Functions
const outerWear = "T-Shirt";

function myOutfit() {
  const outerWear = "Sweater";
  return outerWear;
}

myOutfit();