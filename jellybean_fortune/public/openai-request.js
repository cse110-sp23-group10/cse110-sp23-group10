require('dotenv').config();
let OPENAI_API_KEY = 'bad';
// let OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export default async function (req, res) {
  try {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      prompt: req.body.prompt,
      temperature: 0.7,
      max_tokens: 128,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    }),
  });
  } catch (err) {
    console.log(err);
  }

  const data = await response.json();

  // resulted in an error
  if (data.error != null) {
    console.log(data);
    res.status(500).json({ error: data.error });
    return;
  }
  const completion = data.choices[0].text.trim();

  res.status(200).json({ result: completion });
}
