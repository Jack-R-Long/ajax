const form = document.querySelector("form");
form.addEventListener("submit", submitToWorker);

const spinner = document.getElementById("loading-spinner");

function submitToWorker(event) {
  event.preventDefault();
  spinner.classList.remove("hidden");

  const formData = new FormData(event.target);

  console.log(formData);

  // Make the post request to the worker
  fetch("/api/submit", {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      spinner.classList.add("hidden");

      // Handle the response data
      const responseData = data;
      console.log(responseData);
      //Show the response on the page
      document.getElementById("response").innerHTML = responseData;
    })
    .catch((error) => {
      spinner.classList.add("hidden");
      console.error("Error:", error);
    });
}
