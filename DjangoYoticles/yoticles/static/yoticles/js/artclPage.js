const title_string = document.querySelector('.artclTitle').innerHTML;
const title = encodeURIComponent(title_string);
const artcl_shareBtn = document.querySelector(".artclShareBtn");
const artcl_likeBtn = document.querySelector("#artcl-like-btn");

//add event listener on artcl share btn
artcl_shareBtn.addEventListener('click', () => {
  setupShareBtns(title_string, page_url)
});



const post_id = artcl_likeBtn.getAttribute("data-post-id");

//for toggling the like status
artcl_likeBtn.addEventListener('click', () => {
  alter_like(post_id, artcl_likeBtn);
});


function alter_like(post_id, artcl_likeBtn) {
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

  if (action_performed === 1)
  {
    artcl_likeBtn.classList.remove("active-like-btn");
  }
  else if (action_performed === 2) {
    artcl_likeBtn.classList.add("active-like-btn");
  }
  else {
    show_snackbar("something went wrong "+action_performed, 3000)
  }
  })

}