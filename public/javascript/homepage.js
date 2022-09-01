//add js for homepage

function searchBarHandler (event) {
    event.preventDefault();
    console.log("clicked");

    const searchFor = document.querySelector(
        'select[name="searchSelector"]'
    ).value;

    const searchee = document.querySelector("#search").value || null;
    console.log(`searchee ${searchee}`);
    console.log(`searchFor ${searchFor}`);

    //   if (searchFor === null && searchee !== "") {
    //     //return error = please select a type of search you would like to do
    //   }
    if (searchee == null && searchFor == 1) {
        console.log("it in hurr");
        window.location.replace("../game");
        //redirect all game
    }
    if (searchee == null && searchFor == 2) {
        return window.location.replace("./category");
        //redirect all category
    }
    if (searchee !== null && searchFor == 1) {
        return window.location.replace(`./search/game/${searchee}`);
        //redirect game by name
    }
    if (searchee !== null && searchFor == 2) {
        return window.location.replace(`../search/category/${searchee}`);
        //redirect category by name
    } else {
        console.log("broked");
    }
}

document
    .querySelector("#search-button")
    .addEventListener("click", searchBarHandler);
