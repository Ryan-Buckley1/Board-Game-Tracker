const submitBtn = document.querySelector("#submitPrefs");

async function userPrefHandler(event) {
  event.preventDefault();

  console.log("clicked");

  const game_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  // const favorite =

  const wishlist = document.querySelector('input[name="wishlist"]').checked;
  const favorite = document.querySelector('input[name="favorite"]').checked;
  const ownership = document.querySelector('input[name="ownership"]').checked;
  console.log(wishlist);
  console.log(favorite);
  console.log(ownership);
  const response = await fetch(`/api/gamelist/userPref/${game_id}`, {
    method: "PUT",
    body: JSON.stringify({
      wishlist,
      favorite,
      ownership,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response);
  if (response.ok) {
    alert("Successfully added to your lists!");
    window.location.reload();
  } else {
    alert(response.statusText);
  }
}

submitBtn.addEventListener("click", userPrefHandler);
