//import { blue } from '../assets/dailyFortuneDB/blueQuote.js';

let intervalId = null;

function GoBack() {
  window.location.href = "./jellybean.html";
}

/**
 * Function to register the service workers
 */
const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");
      console.log("Hello");
      if (registration.installing) {
        console.log("Service worker installing");
      } else if (registration.waiting) {
        console.log("Service worker installed");
      } else if (registration.active) {
        console.log("Service worker active");
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};

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

// Upon clicking the Jellybeans, the displayed fortune text will switch to the corresponding color
// All other beans will be greyed out and shrunk
function toggleText(color) {
  var textElement = document.querySelector(".text");
  let state = textElement.state;
  // if click on the same bean, close the text
  if (state == color) {
    textElement.innerHTML = "Choose a Bean";
    textElement.state = "none";
    clearInterval(intervalId);
    resetBeans();
    return;
  }
  resizeBeans(color);
  textElement.innerHTML = `You chose the ${color} jellybean <br> <br>`;
  textElement.innerHTML += `Your fortune is: <br> <br>`;
  randomQuote = getRandomQuote(color);

  if (intervalId !== null) {
    clearInterval(intervalId);
  }

  let i = 0;
  intervalId = setInterval(() => {
    textElement.innerHTML += randomQuote.charAt(i);
    i++;
    if (i === randomQuote.length) {
      clearInterval(intervalId);
      intervalId = null; // Reset interval ID
    }
  }, 20); // Change the delay time (in milliseconds) as needed
  textElement.style.display = "block";
  textElement.state = color;
}

// Returns beans to default opacity and scale
function resetBeans() {
  const beans = document.querySelectorAll('img[alt="Hover over me"]');
  for (let i = 0; i < beans.length; i++) {
    beans[i].style.transform = "scale(1)";
    beans[i].style.opacity = "1";
  }
}

// Scales down and redueces opacity for all the excluding the one that wasn't clicked on
function resizeBeans(color) {
  const beans = document.querySelectorAll('img[alt="Hover over me"]');
  for (let i = 0; i < beans.length; i++) {
    if (beans[i].id == `${color}-jellybean`) {
      beans[i].style.transform = "scale(1.2)";
      beans[i].style.opacity = "1";
    } else {
      beans[i].style.transform = "scale(0.8)";
      beans[i].style.opacity = "0.5";
    }
  }
}

function getRandomQuote(imageId) {
  const quotes = quotePools[imageId];
  if (!quotes || quotes.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

const quotePools = {
  //wealth and prosperity quotes
  green: [
    "Your financial acumen and hard work will pave the way for abundant wealth and prosperity in your future.",
    "Opportunities for financial success will flow into your life effortlessly, bringing you great prosperity.",
    "Your determination and resilience will attract abundant wealth and open doors to a prosperous future.",
    "Investments you make in the near future will yield remarkable returns, securing your financial prosperity.",
    "Your entrepreneurial spirit will lead you to great wealth and success, ensuring a prosperous future.",
    "A combination of strategic decision-making and favorable circumstances will lead you to unparalleled financial prosperity.",
    "Your unique talents and skills will be recognized and handsomely rewarded, bringing you a future filled with wealth and abundance.",
    "As you cultivate a mindset of abundance and gratitude, the universe will conspire to bring you boundless financial prosperity.",
    "Unexpected windfalls and lucrative opportunities will come your way, leading to a future of opulence and financial freedom.",
    "Your unwavering focus on your goals, coupled with your unwavering work ethic, will pave the way to a future overflowing with wealth and prosperity.",
  ],
  //peace and calmness quotes
  blue: [
    "A peaceful and serene life awaits you, filled with gentle breezes and tranquil moments.",
    "In the coming days, you will find solace in the stillness of nature, allowing your mind and body to find ultimate relaxation.",
    "Your future holds a harmonious retreat where stress dissipates, and calmness envelops your every day.",
    "Embrace the soothing rhythm of life, for your future holds a path where serenity and relaxation guide your every step.",
    "A tranquil oasis lies ahead, where your mind will find refuge from the chaos of the world, granting you a serene existence.",
    "Amidst the chaos of the world, you will discover a hidden sanctuary of peace, where your worries will fade away.",
    "The tides of life will carry you to a peaceful shore, where the gentle whispers of the ocean will lull you into deep relaxation.",
    "Embrace the beauty of simplicity, for your future holds a life adorned with moments of calm and unwavering tranquility.",
    "In the stillness of the night, you will find peace and contentment, as your future holds a realm of serenity and relaxation.",
    "Quiet moments will become your sanctuary, offering respite from the noise of the world and inviting profound tranquility into your life.",
  ],
  red: [
    "Beware of financial losses in the near future.",
    "Your relationships may face challenges and hardships.",
    "Expect unforeseen obstacles on your career path.",
    "Take caution when making important decisions as they may lead to regret.",
    "Your health may suffer setbacks, so prioritize self-care.",
    "Be prepared for unexpected accidents or mishaps.",
    "A period of emotional turbulence lies ahead; stay strong.",
    "Miscommunication and misunderstandings may strain your friendships.",
    "You may face legal troubles; seek professional advice.",
    "Prepare for technological failures that can disrupt your daily life.",
  ],
  yellow: [
    "A thrilling adventure awaits you in the near future, bringing you joy, growth, and new horizons.",
    "Prepare for a serendipitous encounter that will change the course of your life, leading you towards boundless possibilities.",
    "Your creative endeavors will flourish, propelling you to new heights of success and recognition.",
    "An unexpected windfall of fortune is headed your way, bringing prosperity and abundance beyond your wildest dreams.",
    "Embrace the unknown, for it holds the key to unlocking remarkable opportunities and breakthroughs in your journey.",
    "In the coming months, you will find yourself surrounded by inspiring individuals who will fuel your passions and push you to greatness.",
    "Your resilience and determination will be rewarded with remarkable achievements, paving the way for a future filled with fulfillment and triumph.",
    "Prepare for a transformative period of self-discovery, where you will uncover hidden talents and unveil your true potential.",
    "A profound love will enter your life, bringing deep connection, happiness, and a lifelong partnership that will enrich your days.",
    "Your relentless pursuit of knowledge and personal growth will lead you to become a beacon of inspiration, guiding others towards a brighter future.",
  ],
  pink: [
    "Love will find you when you least expect it, bringing joy and fulfillment to your heart.",
    "A new romantic chapter is about to begin in your life, filled with passion and excitement.",
    "Be cautious of hasty decisions in matters of the heart; take your time and trust your instincts.",
    "Your current relationship will undergo a positive transformation, deepening the bond between you and your partner.",
    "Past wounds may resurface, but they present an opportunity for healing and growth in your love life.",
    "Prepare for a period of self-discovery, where you will learn to love and appreciate yourself fully before entering a new relationship.",
    "Be open to unexpected connections as a chance encounter could lead to a life-changing love story.",
    "Challenges in your current relationship will test your commitment, but with patience and understanding, you will overcome them.",
    "Beware of illusions and false promises in your love life; seek clarity and honesty to avoid heartbreak.",
    "Your heart will be mended after a period of heartache, leading you to a love that is even greater than you imagined.",
  ],
};

registerServiceWorker();
