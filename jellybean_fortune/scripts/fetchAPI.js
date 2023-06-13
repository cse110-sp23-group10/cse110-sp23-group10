/**  JS for fetching a quote through an external API */

const categories = {
  green: "Prosperity and abundance",
  blue: "Serenity and calmness",
  red: "Passion and excitement",
  yellow: "Joy and happiness.",
  pink: "Love and romance",
  orange: "Energy and enthusiasm",
  mimosa: "New opportunities and beginnings",
  margarita: "Relaxation and fun-filled adventures",
  mojito: "Refreshing changes and growth",
  brown: "Stability and grounding",
  strawberry: "Sweetness and indulgence.",
  silver: "Intuition and Wisdom",
}

async function fetchQuote(color) {
  // first generates a prompt for the api based on the color of the jellybean
  var gptQuestion = `Give me a one sentence fotune based on ${categories[color]}.`;

  // try to make a fetch request to the specified endpoint which handles the https request
  // and uses openai API key to request for a fortune from chatgpt
  try {
    // define an 8 second timeout before resorting to the pre-generated fortunes
    // since we dont want the request to hang forever
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    const endpointURL = ""; // put endpoint url here

    // to setup the endpoint, have it handle post requests and take the body.prompt and request a fortune
    // from chatgpt using that prompt
    let response = await fetch(endpointURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: gptQuestion }),
      signal: controller.signal,
    });

    // clear timeout if request was sucessful
    clearTimeout(timeoutId);

    const data = await response.json();

    // check to see if the request was unsuccessful
    if (response.status !== 200) {
      console.log(data);
      throw data.error || new Error(`Request failed with status ${response.status}`);
    }

    return data.result;
  } catch (err) {
    // fall back to the local fortunes if this fails
    console.log(err);
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }
}