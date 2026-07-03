// =========================================
// DAY 11: DOM Manipulation
// =========================================

// ----- SELECTING ELEMENTS -----
// Get elements by ID
const heading = document.getElementById('myHeading');
const paragraph = document.getElementById('myParagraph');
const displayText = document.getElementById('displayText');

// Get elements by tag name (returns a collection)
const buttons = document.getElementsByTagName('button');

// Get elements by class name (returns a collection)
const boxes = document.getElementsByClassName('box');

// Get elements using querySelector (modern way)
const input = document.querySelector('#liveInput');
const box = document.querySelector('#myBox');
const changeTextBtn = document.querySelector('#changeTextBtn');
const resetTextBtn = document.querySelector('#resetTextBtn');
const highlightBtn = document.querySelector('#highlightBtn');
const boxBtn = document.querySelector('#boxBtn');

// ----- CHANGING CONTENT -----
// Change text with .textContent (safe for user input)
function changeHeadingText() {
    heading.textContent = 'Text Changed!';
    paragraph.textContent = 'The button was clicked!';
}

// Reset text
function resetText() {
    heading.textContent = 'Hello World';
    paragraph.textContent = 'This is a paragraph.';
}

// ----- CHANGING STYLES -----
// Change CSS styles with .style
function toggleHighlight() {
    // Toggle a class instead of directly changing styles
    heading.classList.toggle('highlight');
}

// Toggle box size
function toggleBoxSize() {
    box.classList.toggle('big');
}

// ----- WORKING WITH INPUT (Events) -----
// Event listener for input
input.addEventListener('input', function() {
    const userText = input.value;
    if (userText.trim() === '') {
        displayText.textContent = 'Your text will appear here';
        displayText.style.color = '#2c3e50';
    } else {
        displayText.textContent = `You typed: ${userText}`;
        displayText.style.color = '#3498db';
    }
});

// ----- EVENT LISTENERS -----
// Change text buttons
changeTextBtn.addEventListener('click', changeHeadingText);
resetTextBtn.addEventListener('click', resetText);

// Highlight button
highlightBtn.addEventListener('click', toggleHighlight);

// Box toggle button
boxBtn.addEventListener('click', toggleBoxSize);

// Log to console to confirm script loaded
console.log('DOM Manipulation script loaded successfully!');
console.log('Try clicking the buttons and typing in the input field.');