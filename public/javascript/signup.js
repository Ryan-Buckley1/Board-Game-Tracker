//FUNCTION TAKES ALL USER INPUT DATA AND SENDS TO DB TO  CREATE A NEW USER

async function signupFormHandler(event) {
  event.preventDefault();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  const username = document.querySelector("#username-signup").value.trim();
  const first_name = document.querySelector("#first-name-signup").value.trim();
  const last_name = document.querySelector("#last-name-signup").value.trim();
  if (email && password && username && first_name && last_name) {
    const response = await fetch("/api/users", {
      method: "post",
      body: JSON.stringify({
        first_name,
        last_name,
        username,
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector("#signup-button")
  .addEventListener("click", signupFormHandler);
