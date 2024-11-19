//Code to set up the social share buttons of the share dialog
const page_url = encodeURI(window.location.href);
const message = encodeURIComponent('Hey, Take a look at this article I found');
const hashtags = ['yoticles'];


function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const csrftoken = getCookie('csrftoken');

//set up links of social share buttons with text and url
function setupSocialShareBtns(title, url) {

  const facebook = document.querySelector('.facebook');
  facebook.href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;

  const twitter = document.querySelector('.twitter');
  twitter.href = `https://twitter.com/intent/tweet?hashtags=${hashtags}&text=${title}&url=${url}`;

  const linkedIn = document.querySelector('.linkedin');
  linkedIn.href = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;

  const reddit = document.querySelector('.reddit');
  reddit.href = `https://www.reddit.com/submit?url=${url}&title=${title}`;

  const whatsapp = document.querySelector('.whatsapp');
  whatsapp.href = `https://api.whatsapp.com/send?text=${title}: ${url}`;

  const telegram = document.querySelector('.telegram');
  telegram.href = `https://telegram.me/share/url?url=${url}&text=${title}`;

}


const shareDialogBtn = document.querySelector(".share-icon");
const shareDialog = document.querySelector(".shareDialog");
const shareDialog_url = document.querySelector("[data-shareDialogURL]");
const shareDialog_title = document.querySelector("[data-shareDialogTitle]").firstChild;

const card_share_btns = document.querySelectorAll(".card-share-btn");
const shareDialogBtnsList = document.querySelectorAll(".shareDialog .shareBtn");

let dialogStatusCount = 0; // 0 means in closed state

function toggle_shareDialog() {

  if (dialogStatusCount === 0) {

    dialogStatusCount = 1;

    shareDialog.style.bottom = "0";

    mainBodyTag.style.overflow = "hidden";
    screenCover.style.display = "block";

    screenCover.addEventListener("click", toggle_shareDialog);
    
    setTimeout(() => {
      screenCover.style.backgroundColor = "rgba(0, 0, 0, .5)";
    }, 10);

  }
  else {

    dialogStatusCount = 0;

    shareDialog.style.bottom = "-450px";
    mainBodyTag.style.overflow = "initial";
    screenCover.style.backgroundColor = "transparent";

    screenCover.removeEventListener("click", toggle_shareDialog);

    setTimeout(() => {
      screenCover.style.display = "none";
    }, 300);

  }

}


// Function that evokes the system share dialog
async function system_ShareDialog(title, url) {
  if (navigator.canShare) {
    try {
      await navigator.share({
        title: `${title}`,
        url: `${url}`
      });
    }
    catch (error) {
      show_snackbar(error)
    }
  }
  else {
    show_snackbar("Unfortunately, Your browser doesn't support this feature.", 5000);
  }
}


//sets up the share dialog with proper text, url, and links
function setupShareBtns(title, url) {

  toggle_shareDialog();
  setupSocialShareBtns(title, url);

  shareDialog_title.textContent = title;
  shareDialog_url.textContent = url;

  shareDialogBtn.addEventListener('click', () => {
    system_ShareDialog(title, url);
  }, { once: true });

}


// Adds event listener with function for card share buttons
card_share_btns.forEach(button => {

  const card = button.closest(".contentCards");
  const card_title = card.querySelector(".contentCardHead").innerHTML;
  const card_url = "https://saish660.pythonanywhere.com" + card.querySelector("#article-link").getAttribute("href");

  button.addEventListener('click', () => {
    setupShareBtns(card_title, card_url)
  });

});

// Adds click event listener on all shareBtns so that the dialog closes when user clicks on any of the buttons inside it
shareDialogBtnsList.forEach(button => {
  button.addEventListener('click', toggle_shareDialog);
});


//creates an array of the card_fav_btns and the artcl_btn
var fav_btns = [
 ...document.querySelectorAll('.artcl-add-to-fav-btn'),
 ...document.querySelectorAll(".add-to-fav-btn")
]

//saves an empty list if no list was found in localstorage
if (!(localStorage.getItem("user_fav_list")))
{
  localStorage.setItem('user_fav_list', JSON.stringify([]))
}


//Adds event listener with functon for add-to-favourite buttons on cards
fav_btns.forEach(button => {

  const post_id = button.getAttribute("data-post-id");
  var fav_list_string = localStorage.getItem("user_fav_list");
  var fav_list_array = JSON.parse(fav_list_string);
  
  //sets the status of fav btns when loading
  if (fav_list_array.includes(post_id))
  {
    button.classList.add("active-fav-btn");
  }

  //for toggling the fav status
  button.addEventListener('click', () => {
    alter_favorites(post_id);
    if (button.classList.contains("active-fav-btn")) {
      button.classList.remove("active-fav-btn");

    }
    else {
      button.classList.add("active-fav-btn");
    }
  });

})


function alter_favorites(post_id) {
  var fav_list_string = localStorage.getItem("user_fav_list");
  var fav_list_array = JSON.parse(fav_list_string)

  if (!(fav_list_array.includes(post_id)))
  {
    fav_list_array.push(post_id);
    show_snackbar("Post added to favourites", 3000);

  }
  else {
    fav_list_array = fav_list_array.filter((id) => id !== post_id);
    show_snackbar("Post removed from favourites", 3000)
  }

  localStorage.setItem("user_fav_list", JSON.stringify(fav_list_array))


}


//for time since upload on cards
function updateTimeSinceUpload() {
  const card_time_elements_list = document.querySelectorAll(".card-time-element");

  for (let i = 0; i < card_time_elements_list.length; i++)
  {
    const publicationDate = new Date(card_time_elements_list[i].getAttribute("datetime"))
    const present_date = new Date();
    const timeSinceUpload = present_date - publicationDate;
    const seconds = Math.floor(timeSinceUpload / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12)

    let timeString = "";

    if (years > 0) {
      timeString = `${years} ${years === 1 ? "year" : "years"}`;
    } else if (months > 0) {
      timeString = `${months} ${months === 1 ? "month" : "months"}`;
    } else if (weeks > 0) {
      timeString = `${weeks} ${weeks === 1 ? "week" : "weeks"}`;
    } else if (days > 0) {
      timeString = `${days} ${days === 1 ? "day" : "days"}`;
    } else if (hours > 0) {
      timeString = `${hours} ${hours === 1 ? "hour" : "hours"}`;
    } else if (minutes > 0) {
      timeString = `${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
    } else {
      timeString = `${seconds} ${seconds === 1 ? "second" : "seconds"}`;
    }
    timeString += " ago"
    const timeElement = card_time_elements_list[i];
    timeElement.textContent = timeString;
  }
}

// Call the function to initially display time since upload
updateTimeSinceUpload();
