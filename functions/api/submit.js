/** * POST /api/submit */
export async function onRequestPost(context) {
  // Parse the request body
  let recipient, company, description, sentences;
  try {
    const input = await context.request.formData();
    recipient = input.get("recipient");
    company = input.get("company");
    description = input.get("description");
    sentences = input.get("sentences");
  } catch (err) {
    return new Response("Error parsing JSON content", { status: 400 });
  }

  // Input validation
  if (!recipient || !description || !sentences) {
    return new Response("Missing required fields", { status: 400 });
  }
  if (sentences < 1 || sentences > 10) {
    return new Response("Sentences must be between 1 and 10", { status: 400 });
  }

  // OpenAI API key and config
  const apiKey = context.env.OPEN_API_KEY;
  if (!apiKey) {
    return new Response("Missing OPEN_API_KEY environment variable", {
      status: 500,
    });
  }
  const model = "text-davinci-003";
  const endpoint = "https://api.openai.com/v1/completions";

  // Set up the request body
  const body = {
    model,
    prompt: generateEmailPrompt(recipient, company, description, sentences),
    temperature: 0.7,
    max_tokens: 256,
  };

  // Set up the request options
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  };

  // Send the request to the OpenAI API
  try {
    const response = await fetch(endpoint, options);
    return response;
  } catch (err) {
    return new Response("Error calling OpenAI API", { status: 500 });
  }
}

function generateEmailPrompt(recipient, company, description, sentences) {
  console.log(recipient, company, description, sentences);
  let prompt = "";
  if (company === "none") {
    prompt = `Write a professional email to ${recipient}.
      Write an email describing ${description}.
      Total length ${sentences} sentences.`;
  } else {
    prompt = `Write a professional email to ${recipient} who works at ${company}.  
      Write an email describing ${description}.
      Total length ${sentences} sentences.
      `;
  }
  return prompt;
}

export default onRequestPost;
