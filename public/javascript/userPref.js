//THIS ADDS ABILITY FOR USER TO ADD THE GAME THEY ARE VIEWING TO THEIR FAVORITE LIST, OWNED LIST, AND/OR THEIR WISH LIST

const submitBtn = document.querySelector("#submitPrefs");

async function userPrefHandler(event) {
  event.preventDefault();

  const game_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const wishlist = document.querySelector('input[name="wishlist"]').checked;
  const favorite = document.querySelector('input[name="favorite"]').checked;
  const ownership = document.querySelector('input[name="ownership"]').checked;

  //SENDS FETCH REQUEST TO THE SPECIFICALLY MADE ROUTE FOR USERS TO ADD TO THEIR PREFERENCES
  const response = await fetch(`/api/gamelist/userPref/${game_id}`, {
    method: "PUT",
    body: JSON.stringify({
      ownership,
      favorite,
      wishlist,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    alert("Successfully added to your lists!");
  } else {
    alert(response.statusText);
  }
}

submitBtn.addEventListener("click", userPrefHandler);
