//FUNCTION HANDLES THE SEARCH THAT THE USER DOES ON THE HOMEPAGE

function searchBarHandler(event) {
  event.preventDefault();

  const searchFor = document.querySelector(
    'select[name="searchSelector"]'
  ).value;

  const searchee = document.querySelector("#search").value || null;

  if (searchee == null && searchFor == 1) {
    console.log("it in hurr");
    window.location.replace("./game");
    //redirect to all game
  }
  if (searchee == null && searchFor == 2) {
    return window.location.replace("./category");
    //redirect to all category
  }
  if (searchee !== null && searchFor == 1) {
    return window.location.replace(`./search/game/${searchee}`);
    //redirect to game by name
  }
  if (searchee !== null && searchFor == 2) {
    return window.location.replace(`./search/category/${searchee}`);
    //redirect to category by name
  } else {
    console.log("goofed");
  }
}

document
  .querySelector("#search-button")
  .addEventListener("click", searchBarHandler);
