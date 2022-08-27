(function () {
  "use strict";
  window.addEventListener(
    "load",
    function () {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName("needs-validation");
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener(
          "submit",
          function (event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add("was-validated");
            newGameHandler();
          },
          false
        );
      });
    },
    false
  );
})();

//Handles event and will start all actions needed to create new game

async function newGameHandler(event) {
  event.preventDefault();
  const name = document.querySelector('input[name="game-name]').value.trim();
  const description = document
    .querySelector('input[name="game-description]')
    .value.trim();
  const min_players = document
    .querySelector('input[name="game-min-player]')
    .value.trim();
  const max_players = document
    .querySelector('input[name="game-max-player]')
    .value.trim();
  const duration = document
    .querySelector('input[name="game-duration]')
    .value.trim();
  const age_rating = document
    .querySelector('input[name="game-age-rating]')
    .value.trim();
  const allSelectedCategories = document.querySelectorAll(
    "input[type=checkbox]:checked"
  );
  for (let i = 0; i < allSelectedCategories.length; i++) {
    let catVal = allSelectedCategories[i].value;
    category_id.push(catVal);
  }

  const response = await fetch(`/api/game`, {
    method: "post",
    body: JSON.stringify({
      name,
      description,
      min_players,
      max_players,
      duration,
      age_rating,
      category_id,
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

// document
//   .querySelector("#submit-new-game")
//   .addEventListener("click", newGameHandler);
