/** * POST /api/submit */
export async function onRequestPost(context) {
  try {
    let input = await context.request.formData();

    // Created with ChatGPT
    const apiKey = context.env.OPEN_API_KEY;
    const model = "text-davinci-003";
    const endpoint = "https://api.openai.com/v1/completions";

    // Set up the request body
    const body = {
      model,
      prompt: generateEmailPrompt(input.get('recipient'), input.get('company'), input.get('description'), input.get('sentences')),
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
    const response = await fetch(endpoint, options);

    // Return the response from the OpenAI API as the response to the original request
    return response;

  } catch (err) {
    return new Response("Error parsing JSON content", { status: 400 });
  }
}

function generateEmailPrompt(recipient, company, description, sentences) {
    console.log(recipient, company, description, sentences);
    let prompt = '';
    if (company === "none") {
      prompt = `Write a professional email to ${recipient}.
      Write an email describing ${description}.
      Total length ${sentences} sentences.`
    } else {
      prompt = `Write a professional email to ${recipient} who works at ${company}.  
      Write an email describing ${description}.
      Total length ${sentences} sentences.
      `;
    }
    return prompt;
  }

export default onRequestPost;
