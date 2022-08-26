async function newGameHandler(event) {
  event.preventDefault();

  const name = document.querySelector("#game-name").value.trim();
  const description = document.querySelector("#game-description").value.trim();
  const minPlayer = document.querySelector("#game-min-player").value.trim();
  const maxPlayer = document.querySelector("#game-max-player").value.trim();
  const duration = document.querySelector("#game-duration").value.trim();
  const ageRating = document.querySelector("#game-age-rating").value.trim();
  const categories = document.querySelector("#game-categories").value.trim(); // NOT RIGHT

  const response = await fetch(`/create/game`, {
    method: "post",
    body: JSON.stringify({
      name,
      description,
      minPlayer,
      maxPlayer,
      duration,
      ageRating,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector("#submit-new-game")
  .addEventListener("submit", newGameHandler);
