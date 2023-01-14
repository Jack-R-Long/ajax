const form = document.querySelector("form");
form.addEventListener("submit", submitToWorker);

const spinner = document.getElementById("loading-spinner");
const responseBox = document.getElementById("responseBox");
const submitButton = document.getElementById("submit-btn");

async function submitToWorker(event) {
  event.preventDefault();

  // Set loading state
  spinner.classList.remove("hidden");
  responseBox.classList.add("hidden");
  submitButton.disabled = true;

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
      console.log(data);

      // Set loaded state
      spinner.classList.add("hidden");
      responseBox.classList.remove("hidden");
      submitButton.disabled = false;

      //Show the response on the page
      document.getElementById("response").innerHTML = data.choices[0].text;
    })
    .catch((error) => {
      console.error(error);

      // Set loaded state
      spinner.classList.add("hidden");
      responseBox.classList.remove("hidden");
      submitButton.disabled = false;

      // Show the error on the page
      document.getElementById("response").innerHTML = "error";
    });
}

function test(event) {
  event.preventDefault();
  setTimeout(function () {
    console.log("waiting");
  }, 2000);
  const response = `
  Subject: Cloudflare Workers vs Vercel's Serverless
  
  Dear Jack,
  
  I wanted to reach out to you about the benefits of using Cloudflare Workers compared to Vercel's serverless. Cloudflare Workers provide a much faster speed than Vercel's Serverless. This is due to the fact that Cloudflare Workers are based on a global network of data centers, while Vercel's Serverless is limited to a regional network. Additionally, Cloudflare Workers offer more flexibility and scalability than Vercel's Serverless.
  
  I hope this information is helpful. Feel free to reach out if you have any questions.
  
  Best,
  [Name]
  `;
  document.getElementById("response").innerHTML = response;
}
