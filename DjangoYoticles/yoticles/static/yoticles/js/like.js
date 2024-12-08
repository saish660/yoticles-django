const artcl_likeBtn = document.querySelector("#artcl-like-btn");


const post_id = artcl_likeBtn.getAttribute("data-post-id");

//for toggling the like status
artcl_likeBtn.addEventListener('click', () => {
  alter_like(post_id, artcl_likeBtn);
});


function alter_like(post_id, artcl_likeBtn) {
    if (artcl_likeBtn.classList.contains("active-like-btn"))
  {
    artcl_likeBtn.classList.remove("active-like-btn");
  }
  else {
    artcl_likeBtn.classList.add("active-like-btn");
  }

  let action_performed = 0;
  fetch("/alter_likes", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken
    },
    body: JSON.stringify({"post_id": post_id})
  })
      .then((response) => {
             if (response.redirected) {
            // User is not logged in; redirect them to the login page
            window.location.href = response.url;
        } else {
            return response.json();
        }
      })
      .then((data) => {
          action_performed = data

  if (action_performed !== 1 && action_performed !== 2) {
    show_snackbar("something went wrong", 3000)
  }
  })

}