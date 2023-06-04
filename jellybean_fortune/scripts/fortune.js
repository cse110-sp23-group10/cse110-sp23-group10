//import { blue } from '../assets/dailyFortuneDB/blueQuote.js';

function GoBack() {
    window.location.href = './jellybean.html';
}

// // Get all the images
// const images = document.querySelectorAll('.fortune-beans img');

// // Create an array to store the randomly selected indices
// const randomIndices = [];

// // Generate 5 unique random indices
// while (randomIndices.length < 3) {
//     const randomIndex = Math.floor(Math.random() * images.length);
//     if (!randomIndices.includes(randomIndex)) {
//         randomIndices.push(randomIndex);
//     }
// }

// Load the randomly selected images
// randomIndices.forEach(index => {
//     images[index].style.display = 'block';
// });
const jellybeans = document.querySelectorAll('.fortune-beans img');

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function setRandomPosition(jellybean) {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const randomX = getRandomNumber(0, screenWidth - jellybean.offsetWidth);
  const randomY = getRandomNumber(0, screenHeight - jellybean.offsetHeight);

  jellybean.style.left = randomX + 'px';
  jellybean.style.top = randomY + 'px';
}

jellybeans.forEach(jellybean => {
    jellybean.addEventListener('click', () => {
      alert(`Jellybean clicked! Color: ${jellybean.id}`);
    });
});
  

jellybeans.forEach(setRandomPosition);
  
function animateJellybeans() {
    setInterval(() => {
      jellybeans.forEach(jellybean => {
        setRandomPosition(jellybean);
      });
    }, 2000); 
  }

animateJellybeans();

  
    // Initialize an object to keep track of clicked images
    var storedQuotes = {};

    function toggleText(color, element) {
        var imageId = element.id;
        var quote;

        if (storedQuotes[imageId]) {
            quote = storedQuotes[imageId]; // Retrieve the stored quote
        } else {
            quote = getRandomQuote(color);
            storedQuotes[imageId] = quote; // Store the quote for the image
        }

        // Perform your desired action here
        var textElement = document.querySelector('.text');
        let state = textElement.state;
        textElement.innerHTML = `You chose the ${color} jellybean <br> <br>`;
        textElement.innerHTML += `Your fortune is: <br> <br>`;
        textElement.innerHTML += quote;
        textElement.style.display = 'block';
    }

    function getRandomQuote(imageId) {
        const quotes = quotePools[imageId];
        if (!quotes || quotes.length === 0) {
            return null;
        }
        const randomIndex = Math.floor(Math.random() * quotes.length);
        return quotes[randomIndex];
    }


// function toggleText(color) {
//     var textElement = document.querySelector('.text');
//     let state = textElement.state;
//     textElement.innerHTML = `You chose the ${color} jellybean <br> <br>`;
//     textElement.innerHTML += `Your fortune is: <br> <br>`;
//     randomQuote = getRandomQuote(color);
//     textElement.innerHTML += randomQuote;
//     textElement.style.display = 'block';
//     textElement.state = color;
// }

// function getRandomQuote(imageId) {
//     const quotes = quotePools[imageId];
//     if (!quotes || quotes.length === 0) {
//         return null;
//     }
//     const randomIndex = Math.floor(Math.random() * quotes.length);
//     return quotes[randomIndex];
// }

const quotePools = {

    green: [
        "Green Quote 1",
        "Green Quote 2",
        "Green Quote 3",
        // Add more quotes as needed for green jellybean
    ],
    blue: [
        "Blue Quote 1",
        "Blue Quote 2",
        "Blue Quote 3",
        // Add more quotes as needed for blue jellybean
    ],
    red: [
        "Red Quote 1",
        "Red Quote 2",
        "Red Quote 3",
        // Add more quotes as needed for red jellybean
    ],
    yellow: [
        "Yellow Quote 1",
        "Yellow Quote 2",
        "Yellow Quote 3",
        // Add more quotes as needed for yellow jellybean
    ],
    pink: [
        "Pink Quote 1",
        "Pink Quote 2",
        "Pink Quote 3",
        // Add more quotes as needed for pink jellybean
    ],
    orange: [
        "orange Quote 1",
        "orange Quote 2",
        "orange Quote 3",
        // Add more quotes as needed for orange jellybean
    ],
    mimosa: [
        "mimosa Quote 1",
        "mimosa Quote 2",
        "mimosa Quote 3",
        // Add more quotes as needed for mimosa jellybean
    ],
    margarita: [
        "margarita Quote 1",
        "margarita Quote 2",
        "margarita Quote 3",
        // Add more quotes as needed for margarita jellybean
    ],
    mojito: [
        "mojito Quote 1",
        "mojito Quote 2",
        "mojito Quote 3",
        // Add more quotes as needed for mojito jellybean
    ],
    brown: [
        "brown Quote 1",
        "brown Quote 2",
        "brown Quote 3",
        // Add more quotes as needed for brown jellybean
    ],
    strawberry: [
        "strawberry Quote 1",
        "strawberry Quote 2",
        "strawberry Quote 3",
        // Add more quotes as needed for strawberry jellybean
    ],
    silver: [
        "silver Quote 1",
        "silver Quote 2",
        "silver Quote 3",
        // Add more quotes as needed for silver jellybean
    ]
};