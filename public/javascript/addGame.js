//CHECKS OVER FORM TO MAKE SURE ALL REQUIRED FIELDS HAVE BEEN FILLED OUT

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
            newGameHandler(event);
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
  const name = document.querySelector('input[name="game-name"]').value;
  const description = document.querySelector(
    'textarea[name="game-description"]'
  ).value;
  const min_players = document.querySelector(
    'input[name="game-min-player"]'
  ).value;
  const max_players = document.querySelector(
    'input[name="game-max-player"]'
  ).value;
  const duration = document.querySelector('select[name="game-duration"]').value;
  const age_rating = document.querySelector(
    'select[name="game-age-rating"]'
  ).value;
  const allSelectedCategories = document.querySelectorAll(
    "input[type=checkbox]:checked"
  );
  const image = document.getElementById("image_file").files[0] || null;
  let category_id = [];
  for (let i = 0; i < allSelectedCategories.length; i++) {
    let catVal = allSelectedCategories[i].value;
    category_id.push(catVal);
  }
  //HAD TO CHANGE TO FORM DATA FOR CLOUDINARY TO WORK
  var formData = new FormData();
  formData.append("uploaded_file", image);
  formData.append("name", name);
  formData.append("description", description);
  formData.append("min_players", min_players);
  formData.append("max_players", max_players);
  formData.append("age_rating", age_rating);
  formData.append("duration", duration);
  formData.append("category_id", category_id.join(","));
  const response = await fetch(`/api/game`, {
    method: "post",
    body: formData,
  });
  if (response.ok) {
    alert("Game successfully created!");
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
}

// document
//   .querySelector("#submit-new-game")
//   .addEventListener("click", newGameHandler);

// var myWidget = cloudinary.createUploadWidget(
//   {
//     cloudName: "dtcrmm1fs",
//     uploadPreset: "board_game",
//   },
//   (error, result) => {
//     if (!error && result && result.event === "success") {
//       console.log("Done! Here is the image info: ", result.info);
//     }
//   }
// );

// document.getElementById("upload_widget").addEventListener(
//   "click",
//   function () {
//     myWidget.open();
//   },
//   false
// );
