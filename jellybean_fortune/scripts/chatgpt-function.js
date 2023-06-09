// import dotenv from '../dotenv';

// dotenv.config()

// const OPENAI_API_KEY="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"

async function openai_test(prompt) {
  const response = await fetch("https://api.openai.com/v1/engines/text-davinci-003/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer OPENAI_API_KEY",
    },
    body: JSON.stringify({
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 128,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    }),
  });

  const data = await response.json();
  if (data.error != null) {
    console.log(data);
    throw new Error(data.error);
  }
  const completion = data.choices[0].text.trim();

  return completion;
}

export default openai_test;
