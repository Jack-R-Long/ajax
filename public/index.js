const form = document.querySelector("form");
form.addEventListener("submit", submitToWorker);

const spinner = document.getElementById("loading-spinner");
const responseBox = document.getElementById("responseBox");

function submitToWorker(event) {
  event.preventDefault();
  spinner.classList.remove("hidden");
  responseBox.classList.add("hidden");

  // Get the form data
  const formData = new FormData(event.target);

  // Make the post request to the worker
  fetch("/api/submit", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(
          "Error: " + response.status + " " + response.statusText
        );
      }
    })
    .then((data) => {
      spinner.classList.add("hidden");

      console.log(data);
      //Show the response on the page
      responseBox.classList.remove("hidden");
      document.getElementById("response").innerHTML = data.choices[0].text;
    })
    .catch((error) => {
      spinner.classList.add("hidden");
      console.error(error);
      // Show the error on the page
      responseBox.classList.remove("hidden");
      document.getElementById("response").innerHTML = "error"
    });
}

function test(event) {
  event.preventDefault();
  const response =   `
  Subject: Cloudflare Workers vs Vercel's Serverless
  
  Dear Jack,
  
  I wanted to reach out to you about the benefits of using Cloudflare Workers compared to Vercel's serverless. Cloudflare Workers provide a much faster speed than Vercel's Serverless. This is due to the fact that Cloudflare Workers are based on a global network of data centers, while Vercel's Serverless is limited to a regional network. Additionally, Cloudflare Workers offer more flexibility and scalability than Vercel's Serverless.
  
  I hope this information is helpful. Feel free to reach out if you have any questions.
  
  Best,
  [Name]
  `
  document.getElementById("response").innerHTML = response;
}
