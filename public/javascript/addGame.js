
//Handles event and will start all actions needed to create new game
async function newGameHandler(event) {
  event.preventDefault();

  await createGame();
}

//Creates game and sends to post route
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
//adds game to bridge route since users are allowed to pick multiple
async function addToBridge(name) {

    //empty array for choices to get pushed to
  let wantedCategories = [];

  //checked boxes - still not set up correctly. Values will be send to empty array
  const categories = document.querySelector("#game-categories");
    //gets id of created game
  const response = await fetch(`api/name/${name}`, {
    method: "get",
  });
  if (response.ok) {

    //needs to be a for each/ each to work with each of the different categories the user picks
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
