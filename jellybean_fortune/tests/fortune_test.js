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

// Write your tests
test("Clicking on a jellybean should make the others smaller and lower their opacity", () => {
  // Simulate clicking on the beans
  const beans = document.querySelectorAll('img[alt="Hover over me"]');
  for (let i = 0; i < beans.length; i++) {
    beans[i].click();
    ed
    // check the other beans properties
    for (let j = 0; j < beans.length; j++) {
        if (i === j) continue;

    }
  }

  // Assert that the current page URL is the expected value
  expect(window.location.href).toBe("expected-url");
});

test("Clickg on the same ", () => {
  const beans = document.querySelectorAll('img[alt="Hover over me"]');
});
