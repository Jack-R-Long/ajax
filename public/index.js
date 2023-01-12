const form = document.querySelector("form");
form.addEventListener("submit", submitToWorker);

function submitToWorker(event) {
  event.preventDefault();

  const formData = new FormData(event.target);

  // Make the post request to the worker
  fetch("/api/submit", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response data
      const responseData = data;
      console.log(responseData);
      //Show the response on the page
      document.getElementById("response").innerHTML = responseData;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
