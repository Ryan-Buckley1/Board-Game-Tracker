async function newGameHandler(event) {
  event.preventDefault();

  await createGame();
}

async function createGame() {
  const name = document.querySelector("#game-name").value.trim();
  const description = document.querySelector("#game-description").value.trim();
  const minPlayer = document.querySelector("#game-min-player").value.trim();
  const maxPlayer = document.querySelector("#game-max-player").value.trim();
  const duration = document.querySelector("#game-duration").value.trim();
  const ageRating = document.querySelector("#game-age-rating").value.trim();
  //   const categories = document.querySelector("#game-categories").value.trim(); // NOT RIGHT

  const response = await fetch(`/api/game`, {
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
    // document.location.replace("/dashboard");
    addToBridge(name);
  } else {
    alert(response.statusText);
  }
}

async function addToBridge(name) {
  let wantedCategories = [];

  const categories = document.querySelector("#game-categories");

  const response = await fetch(`api/name/${name}`, {
    method: "get",
  });
  if (response.ok) {
    const bridgeResponse = await fetch("/api/gtb", {
      method: "post",
      body: JSON.stringify({
        game_id: response.attributes.id,
      }),
    });
  }
}

document
  .querySelector("#submit-new-game")
  .addEventListener("submit", newGameHandler);
