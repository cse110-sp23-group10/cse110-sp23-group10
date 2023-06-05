/*
const fs = require("fs");
const { JSDOM } = require("jsdom");

// Load the HTML file
const html = fs.readFileSync("../fortune.html", "utf-8");
const dom = new JSDOM(html);
const { window } = dom;

// Set up the global variables
global.window = window;
global.document = window.document;

// Include the JavaScript file to be tested
const fortuneTest = require("../scripts/fortune.js");

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
*/

// Write your tests

test("Clicking on the same jellybean twice should cause the opacity and text to return to default", () => {
    const beans = document.querySelectorAll('img[alt="Hover over me"]');
    for(let i = 0; i < beans.length; i ++){
      beans[i].click();
      beans[i].click();
      
      expect(beans[i].style.opacity).toBe('1')
      expect(beans[i].style.transform).toBe('scale(1)');
    }
  });

test("Clicking on a jellybean should make the others smaller and lower their opacity", () => {
  // Simulate clicking on the beans
  let styling = true;
  
  const beans = document.querySelectorAll('img[alt="Hover over me"]');
  for (let i = 0; i < beans.length; i++) {
    beans[i].click();
    delay(500);
    // check current beans properties
    styling &= beans[i].style.opacity == '1';
    styling &= beans[i].style.transform == 'scale(1)';
    // check the other beans properties
    for (let j = 0; j < beans.length; j++) {
        if (i === j) continue;
        styling &= beans[j].style.opacity == '0.5';
        styling &= beans[j].style.transform == 'scale(0.8)';
    }
  }

  // Assert that the current page URL is the expected value
  expect(styling).toBe(true);
});


