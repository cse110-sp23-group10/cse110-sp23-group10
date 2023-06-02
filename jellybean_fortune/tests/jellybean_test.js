const fs = require("fs");
const { JSDOM } = require("jsdom");

// Load the HTML file
const html = fs.readFileSync("../jellybean.html", "utf-8");
const dom = new JSDOM(html);
const { window } = dom;

// Set up the global variables
global.window = window;
global.document = window.document;

// Include the JavaScript file to be tested
const jellyBeanScript = require("../scripts/jellybean.js");

// Import any necessary functions from the JavaScript file
const { shakeJar } = jellyBeanScript;

// Write your tests
test("Logo click should redirect to the correct page", () => {
  // Simulate clicking on the logo
  const logoImg = document.querySelector(".logo-img");
  logoImg.click();

  // Assert that the current page URL is the expected value
  expect(window.location.href).toBe("expected-url");
});

test("Shake Jar button should shake the jar", () => {
  // Simulate clicking on the Shake Jar button
  shakeJar();

  // Assert that the jar element has the 'shake' class
  const jarElement = document.getElementById("jar-beans");
  expect(jarElement.classList.contains("shake")).toBe(true);
});
