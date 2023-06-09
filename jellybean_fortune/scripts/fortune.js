/** JS for the Fotune page */

if (typeof module === "object") {
  module.exports = { getFortuneFromLocalStorage };
}

var fortuneInterval = null;

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
function toggleText(color, element) {
  incrementJellybBeanClicked();
  let imageId = element.id;
  let quote;
  let textElement = document.querySelector(".text");
  let state = textElement.state;
  textElement.state = color;

  clearInterval(fortuneInterval);

  // if click on the same bean, close the text
  if (state == color) {
    resetBeans();
    return;
  }
  // resize the bean when another bean is clicked
  resizeBeans(color);

  if (storedQuotes[color]) {
    // Retrieve the stored quote for selected jellybean
    quote = storedQuotes[color];
  } else {
    quote = getRandomQuote(color);

    // Store the quote for the selected jellybean
    storedQuotes[color] = quote;

    addToLocalStorage(color, quote);
  }

  //textElement.innerHTML = `You chose the ${color} jellybean <br> <br>`;
  textElement.innerHTML = `Your daily fortune is: <br> <br>`;

  writeFortune(quote);
  textElement.style.display = "block";
}

/**
 * Function to type out fortune letter by letter when generating
 */
function writeFortune(quote) {
  let textElement = document.querySelector(".text");

  let i = 0;
  fortuneInterval = setInterval(() => {
    textElement.innerHTML += quote.charAt(i);
    i++;
    if (i === quote.length) {
      clearInterval(fortuneInterval);
      fortuneInterval = null; // Reset interval ID
    }
  }, 20); // Change the delay time (in milliseconds) as needed
}

/**
 * Function to add a quote to the localStorage under a specified color
 */
function addToLocalStorage(color, quote) {
  // adding to local storage when generating new fortune
  let randomQuote = quote;
  let existingFortunes = localStorage.getItem("fortunes");
  let fortunes = existingFortunes ? JSON.parse(existingFortunes) : [];
  // Add the new fortune to the list
  fortunes.push([color, randomQuote]);
  // Store the updated list back in local storage
  localStorage.setItem("fortunes", JSON.stringify(fortunes));
}

/**
 * Function to get a random quote from the quote pool
 */
function getRandomQuote(color) {
  const quotes = quotePools[color];

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
  const textElement = document.querySelector(".text");
  textElement.innerHTML = "Choose a Bean";
  textElement.state = "none";

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

const quotePools = {
  //  prosperity and abundance quotes
  green: [
    "Green brings luck! Today, you will discover something wonderful that will make you smile.",
    "Embrace the color green and watch your dreams grow! Today, your efforts will lead to a great achievement.",
    "Green means go! Get ready for an exciting day filled with new opportunities and adventures.",
    "With a little green magic, anything is possible! Today, you'll find a creative solution to a problem.",
    "Green brings harmony and balance. Today, you'll enjoy peaceful moments and positive interactions.",
    "Let the color green inspire you! Today, your imagination will soar and you'll create something amazing.",
    "Green reminds us to appreciate nature. Today, take a walk outside and discover the beauty around you.",
    "Green is the color of growth. Today, you'll learn something new that will help you grow as a person.",
    "Green symbolizes freshness. Today, a fresh start awaits you, bringing renewed energy and enthusiasm.",
    "Green brings good fortune! Today, luck will be on your side, bringing you unexpected joy and surprises.",
  ],
  // Serenity and calmness quotes
  blue: [
    "Blue represents calmness and tranquility. Today, find moments of peace amidst the chaos.",
    "Embrace the soothing color blue! Today, take care of yourself and indulge in self-care activities.",
    "Blue brings clarity of mind. Today, you'll find solutions to challenges with ease and confidence.",
    "With a touch of blue, your day will be filled with serenity and harmony. Enjoy the peaceful moments.",
    "Blue symbolizes communication. Today, express yourself clearly and listen attentively to others.",
    "Let the color blue inspire your creativity! Today, immerse yourself in artistic pursuits and let your imagination flow.",
    "Blue reminds us to be compassionate. Today, show kindness and empathy towards others.",
    "Blue represents loyalty. Today, strengthen your bonds with loved ones and be a reliable friend.",
    "Blue brings inspiration. Today, seek inspiration from the world around you and let it fuel your passions.",
    "Blue brings good luck! Today, you'll encounter fortunate circumstances that lead to positive outcomes.",
  ],
  // Passion and excitement quotes
  red: [
    "Red ignites passion and energy. Today, approach your tasks with enthusiasm and determination.",
    "Embrace the fiery color red! Today, let your boldness shine and take calculated risks.",
    "Red represents love and romance. Today, express your affection to someone special and spread love around.",
    "With a touch of red, you'll feel empowered and confident. Today, embrace your inner strength.",
    "Red symbolizes action. Today, seize the moment and make progress towards your goals.",
    "Let the color red fuel your creativity! Today, channel your passion into your artistic pursuits.",
    "Red reminds us to be courageous. Today, face your fears head-on and embrace new challenges.",
    "Red represents determination. Today, stay focused on your objectives and overcome obstacles.",
    "Red brings excitement. Today, engage in activities that bring you joy and make your heart race.",
    "Red brings good luck! Today, opportunities will come your way, bringing you success and fulfillment.",
  ],
  // Joy and happiness quotes
  yellow: [
    "Yellow brings positivity and happiness. Today, radiate positivity and spread joy to those around you.",
    "Embrace the cheerful color yellow! Today, focus on the bright side of every situation.",
    "Yellow represents optimism. Today, believe in the power of positive thinking and expect great things.",
    "With a touch of yellow, your day will be filled with sunshine and laughter. Enjoy the moments of happiness.",
    "Yellow symbolizes creativity. Today, let your imagination run wild and explore new ideas.",
    "Let the color yellow inspire you! Today, embark on a new adventure and embrace opportunities for growth.",
    "Yellow reminds us to be grateful. Today, express gratitude for the blessings in your life.",
    "Yellow represents energy and vitality. Today, engage in activities that recharge your spirit and boost your energy.",
    "Yellow brings joy. Today, find joy in the little things and let your smile brighten the world.",
    "Yellow brings good luck! Today, fortunate events will unfold, bringing you happiness and success.",
  ],
  // Love and romance quotes
  pink: [
    "Pink represents love and compassion. Today, show kindness and affection towards others.",
    "Embrace the gentle color pink! Today, nurture your relationships and foster a sense of connection.",
    "Pink brings sweetness and tenderness. Today, express your care and appreciation to loved ones.",
    "With a touch of pink, your day will be filled with warmth and affection. Embrace the loving moments.",
    "Pink symbolizes harmony. Today, seek harmony in your interactions and create a peaceful atmosphere.",
    "Let the color pink inspire your creativity! Today, engage in artistic pursuits that bring you joy.",
    "Pink reminds us to be gentle. Today, practice self-care and treat yourself with love and compassion.",
    "Pink represents beauty. Today, appreciate the beauty in yourself and the world around you.",
    "Pink brings joy. Today, find joy in simple pleasures and let your heart overflow with happiness.",
    "Pink brings good luck! Today, love and happiness will surround you, bringing you delightful surprises.",
  ],
  // Energy and enthusiasm quotes
  orange: [
    "Orange ignites enthusiasm and creativity. Today, approach your tasks with passion and innovative thinking.",
    "Embrace the vibrant color orange! Today, seize opportunities for growth and personal development.",
    "Orange represents vitality. Today, energize your body and mind through healthy choices and positive habits.",
    "With a touch of orange, your day will be filled with excitement and optimism. Embrace the adventure ahead.",
    "Orange symbolizes social connections. Today, engage with others, make new friends, and foster meaningful relationships.",
    "Let the color orange inspire your creativity! Today, embrace your unique ideas and express yourself freely.",
    "Orange reminds us to be adventurous. Today, step out of your comfort zone and embrace new experiences.",
    "Orange represents enthusiasm. Today, approach your tasks with a positive attitude and infectious energy.",
    "Orange brings joy. Today, find joy in the simple pleasures of life and let laughter fill your day.",
    "Orange brings good luck! Today, fortunate encounters and opportunities will come your way.",
  ],
  // New opportunities and beginnings quotes
  mimosa: [
    "Mimosa brings a sense of relaxation. Today, take time for self-care and indulge in moments of rest.",
    "Embrace the calming color of mimosa! Today, create a peaceful environment that nurtures your well-being.",
    "Mimosa represents harmony. Today, strive for balance in all aspects of your life and find inner peace.",
    "With a touch of mimosa, your day will be filled with serenity and tranquility. Enjoy the calm moments.",
    "Mimosa symbolizes rejuvenation. Today, engage in activities that refresh and revitalize your mind, body, and spirit.",
    "Let the color mimosa inspire your creativity! Today, immerse yourself in artistic pursuits that bring you joy.",
    "Mimosa reminds us to be present. Today, practice mindfulness and embrace the beauty of the present moment.",
    "Mimosa represents self-care. Today, prioritize your well-being and take care of your physical and emotional needs.",
    "Mimosa brings peace. Today, release any stress or worries and find solace in the stillness of the moment.",
    "Mimosa brings good luck! Today, you'll find harmony and balance, attracting positive energies into your life.",
  ],
  // Relaxation and fun-filled adventures quotes
  margarita: [
    "Margarita brings a sense of celebration. Today, find reasons to celebrate and enjoy the moments of joy.",
    "Embrace the festive color of margarita! Today, let your spirit soar and embrace the lively energy around you.",
    "Margarita represents fun and excitement. Today, engage in activities that bring you laughter and happiness.",
    "With a touch of margarita, your day will be filled with good times and memorable experiences. Enjoy the festivities.",
    "Margarita symbolizes friendship. Today, cherish your friendships and create lasting memories together.",
    "Let the color margarita inspire your creativity! Today, express yourself freely and let your personality shine.",
    "Margarita reminds us to be adventurous. Today, try something new and embrace the thrill of new experiences.",
    "Margarita represents spontaneity. Today, go with the flow and embrace the surprises that come your way.",
    "Margarita brings joy. Today, surround yourself with positive people and engage in activities that bring you joy.",
    "Margarita brings good luck! Today, you'll encounter opportunities for fun and enjoyment, creating lasting memories.",
  ],
  // Refreshing changes and growth quotes
  mojito: [
    "Mojito brings a refreshing vibe. Today, rejuvenate your mind, body, and soul with moments of relaxation.",
    "Embrace the cool color of mojito! Today, find moments to refresh and recharge yourself.",
    "Mojito represents balance. Today, seek harmony in all aspects of your life and restore your inner equilibrium.",
    "With a touch of mojito, your day will be filled with freshness and vitality. Embrace the invigorating moments.",
    "Mojito symbolizes clarity. Today, clear your mind and gain insights that lead to greater understanding.",
    "Let the color mojito inspire your creativity! Today, engage in activities that spark your imagination and bring you joy.",
    "Mojito reminds us to be present. Today, savor each moment and find joy in the simple pleasures of life.",
    "Mojito represents self-care. Today, prioritize self-care and make choices that nourish your well-being.",
    "Mojito brings tranquility. Today, find moments of calm amidst the chaos and let peace fill your heart.",
    "Mojito brings good luck! Today, you'll find a sense of balance and peace, attracting positive energies into your life.",
  ],
  // Stability and grounding quotes
  brown: [
    "Brown represents stability and grounding. Today, focus on creating a solid foundation for your goals.",
    "Embrace the earthy color brown! Today, find comfort in the familiar and appreciate the simple things in life.",
    "Brown brings a sense of reliability. Today, be dependable and fulfill your commitments with integrity.",
    "With a touch of brown, your day will be filled with stability and practicality. Embrace the steady moments.",
    "Brown symbolizes resilience. Today, face challenges with determination and find strength in adversity.",
    "Let the color brown inspire your creativity! Today, find beauty in the ordinary and explore new perspectives.",
    "Brown reminds us to be resourceful. Today, make the most of what you have and find innovative solutions.",
    "Brown represents warmth. Today, spread kindness and create a welcoming atmosphere for others.",
    "Brown brings comfort. Today, find solace in familiar routines and activities that bring you peace.",
    "Brown brings good luck! Today, you'll find stability and support, attracting positive energies into your life.",
  ],
  // Sweetness and indulgence quotes
  strawberry: [
    "Strawberry brings a touch of sweetness. Today, indulge in the things that bring you joy and happiness.",
    "Embrace the vibrant color of strawberry! Today, let your passion and enthusiasm guide your actions.",
    "Strawberry represents love and affection. Today, express your love to those who are dear to your heart.",
    "With a touch of strawberry, your day will be filled with delightful moments and pleasant surprises.",
    "Strawberry symbolizes creativity. Today, let your imagination run wild and explore new artistic endeavors.",
    "Let the color strawberry inspire you! Today, follow your heart's desires and pursue what brings you joy.",
    "Strawberry reminds us to be grateful. Today, appreciate the blessings in your life and show gratitude.",
    "Strawberry represents sweetness. Today, spread kindness and make someone's day a little brighter.",
    "Strawberry brings joy. Today, find happiness in the little things and let your heart be filled with joy.",
    "Strawberry brings good luck! Today, love and joy will surround you, attracting positive energies into your life.",
  ],
  // Intuition and Wisdom quotes
  silver: [
    "Silver represents intuition and reflection. Today, listen to your inner voice and trust your instincts.",
    "Embrace the shimmering color silver! Today, take time to reflect on your thoughts and emotions.",
    "Silver brings a sense of mystery. Today, embrace the unknown and be open to new possibilities.",
    "With a touch of silver, your day will be filled with insights and wisdom. Pay attention to the signs.",
    "Silver symbolizes elegance. Today, carry yourself with grace and embrace the beauty within you.",
    "Let the color silver inspire your creativity! Today, tap into your artistic talents and express yourself.",
    "Silver reminds us to be adaptable. Today, embrace change and find beauty in the unexpected.",
    "Silver represents intuition. Today, trust your instincts and make decisions with confidence.",
    "Silver brings serenity. Today, find moments of calmness and peace amidst the chaos of life.",
    "Silver brings good luck! Today, you'll receive guidance and wisdom, attracting positive energies into your life.",
  ],
};
