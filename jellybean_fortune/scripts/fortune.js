/** JS for the Fotune page */

if (typeof module === "object") {
  module.exports = { getFortuneFromLocalStorage };
}

let fortuneInterval = null;

/**
 * Function to return to home
 */
function GoHome() {
  window.location.href = "./jellybean.html";
}

/**
 * Function to go to account page
 */
function GoAccount() {
  window.location.href = "./account.html";
}

/**
 * Function to increment the number of times a jellybean has been clicked
 */
function incrementJellybBeanClicked() {
  // Retrieve the current value of num_clicked from local storage
  var numClicked = localStorage.getItem("num_clicked");

  // Convert the value to a number and increment by 1
  numClicked = parseInt(numClicked) || 0;
  numClicked++;

  // Store the updated value back to local storage
  localStorage.setItem("num_clicked", numClicked);
}

/**
 * Function to get fortune from local storage
 */
function getFortuneFromLocalStorage() {
  const fortune = localStorage.getItem("fortune");
  return fortune;
}

const jellybeans = document.querySelectorAll(".fortune-beans img");

// gets a random number which is used to set a random position
function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Function to set a random position for a jellybean
 */
function setRandomPosition(jellybean) {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const randomX = getRandomNumber(0, screenWidth - jellybean.offsetWidth);
  const randomY = getRandomNumber(0, screenHeight - jellybean.offsetHeight);

  jellybean.style.left = randomX + "px";
  jellybean.style.top = randomY + "px";
}

jellybeans.forEach(setRandomPosition);

/**
 * Function to set a random position for a jellybean every 5 seconds
 * (complete the animation)
 */
function animateJellybeans() {
  setInterval(() => {
    jellybeans.forEach((jellybean) => {
      setRandomPosition(jellybean);
    });
  }, 5000);
}

animateJellybeans();

// Initialize an object to keep track of clicked images
var storedQuotes = {};

/**
 * Function to toggle the text when a jellybean is clicked
 */
async function toggleText(color, element) {
  incrementJellybBeanClicked();
  let imageId = element.id;
  let quote;
  let textElement = document.querySelector(".text");
  let state = textElement.state;
  textElement.state = color;

  clearInterval(fortuneInterval);

  // if click on the same bean, close the text
  if (state == color) {
    textElement.innerHTML = "Choose a Bean";
    textElement.state = "none";
    resetBeans();
    return;
  }
  // resize the bean when another bean is clicked
  resizeBeans(color);

  if (storedQuotes[imageId] == "") {
    // this means a fortune of this type is already generating,
    // so we can just put the default text back and return
    textElement.innerHTML = "Generating a Fortune...";
    return;
  }

  if (storedQuotes[imageId]) {
    quote = storedQuotes[imageId]; // Retrieve the stored quote
  } else {
    // generates either from openai or gets preset fortune
    textElement.innerHTML = "Generating a Fortune...";

    // put a placeholder into stored quotes while a quote is generating, preventing from generating the same one twice
    storedQuotes[imageId] = "";

    quote = await getRandomQuote(color);

    if (quote.charAt(0) == '"' && quote.charAt(quote.length - 1) == '"') {
      quote = quote.substring(1, quote.length - 1);
    }

    storedQuotes[imageId] = quote; // Store the quote for the image

    // adding to local storage when generating new fortune
    let randomQuote = quote;
    let existingFortunes = localStorage.getItem("fortunes");
    let fortunes = existingFortunes ? JSON.parse(existingFortunes) : [];
    // Add the new fortune to the list
    fortunes.push([color, randomQuote]);
    // Store the updated list back in local storage
    localStorage.setItem("fortunes", JSON.stringify(fortunes));
  }

  loadingBean.style.display = "none";

  if (textElement.state != color) {
    return;
  }

  //textElement.innerHTML = `You chose the ${color} jellybean <br> <br>`;
  textElement.innerHTML = `Your daily fortune is: <br> <br>`;

  // for generating fortune letter by letter
  let i = 0;
  fortuneInterval = setInterval(() => {
    textElement.innerHTML += quote.charAt(i);
    i++;
    if (i === quote.length) {
      clearInterval(fortuneInterval);
      fortuneInterval = null; // Reset interval ID
    }
  }, 20); // Change the delay time (in milliseconds) as needed
  textElement.style.display = "block";
}

/**
 * Function to get a random quote from the quote pool
 */
function getRandomQuote(imageId) {
  const quotes = quotePools[imageId];

  // removed chatgpt api due to difficulty to implement
  // can be done through the fetchQuote() function from fetchAPI.js
  // possible implementation: fetch for a chatgpt fortune, and fall
  // back to the local one below if that fails

  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

/**
 * Function to reset the jellybeans to their original state
 */
function resetBeans() {
  const beans = document.querySelectorAll('img[alt="Hover over me"]');
  for (let i = 0; i < beans.length; i++) {
    beans[i].classList.remove("bean-selected");
    beans[i].classList.remove("bean-unselected");
  }
}

/**
 * Function to resize the jellybean when it is clicked
 */
function resizeBeans(color) {
  const beans = document.querySelectorAll('img[alt="Hover over me"]');
  // console.log(beans);
  for (let i = 0; i < beans.length; i++) {
    if (beans[i].id == `${color}-jellybean`) {
      beans[i].classList.add("bean-selected");
      beans[i].classList.remove("bean-unselected");
    } else {
      beans[i].classList.remove("bean-selected");
      beans[i].classList.add("bean-unselected");
    }
  }
}

const quotePools = fetch("./fortunes.json");