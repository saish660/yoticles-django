const menuImg = document.querySelector("#mainMenuImg");
const menuDiv = document.querySelector("#menuDiv");
const mainBodyTag = document.querySelector("#mainBody");
const screenCover = document.querySelector(".screenCover");
const themeBtn = document.querySelector("#switchThemeBtn");
const cssVar = document.querySelector(':root');

//checkTheme();

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    toggleBanner();
  }, 1500);
});

menuImg.onclick = toggleMenu;


var menuStatusCount = 0; //0 means in closed state

function toggleMenu() {
  if (menuStatusCount == 0) {
    display_menu();
  }
  else {
    hide_menu();
  }

}

function display_menu() {
  menuDiv.style.left = "0";
  mainBodyTag.style.overflow = "hidden";
  menuStatusCount = 1;
  screenCover.style.display = "block";
  screenCover.addEventListener("click", toggleMenu);
  setTimeout(() => {
    screenCover.style.backgroundColor = "rgba(0, 0, 0, .5)";
  }, 10)
}

function hide_menu() {
  menuDiv.style.left = "-350px";
  mainBodyTag.style.overflow = "initial";
  menuStatusCount = 0;
  screenCover.style.backgroundColor = "transparent";
  screenCover.removeEventListener("click", toggleMenu);
  setTimeout(() => {
    screenCover.style.display = "none";
  }, 300)
}


themeBtn.onclick = toggleTheme;


function darkTheme() {
  cssVar.style.setProperty('--orgnlColor', 'black');
  cssVar.style.setProperty('--inverseColor', 'white');
  cssVar.style.setProperty('--titleColor', 'white');
  cssVar.style.setProperty('--tempColor', 'silver');
  cssVar.style.setProperty('--color3', 'white');
  cssVar.style.setProperty('--textColor', 'silver');
  cssVar.style.setProperty('--bgColorMain', 'hsla(0, 0%, 10%, 1)');
  cssVar.style.setProperty('--bgColor1', ' hsla(0, 0%, 15%, 1)');
  cssVar.style.setProperty('--cardBgColor', 'hsla(0, 0%, 15%, 1)');
  cssVar.style.setProperty('--lightShadow', 'rgba(0, 0, 0, .6)');
  cssVar.style.setProperty('--animating-color', 'hsla(162, 100%, 50%, 1)');
  cssVar.style.setProperty('--bgColorExternal', 'hsla(0, 0%, 10%, 1)');
  cssVar.style.setProperty('--linkColor', ' hsl(250, 90%, 72%)');

}

function lightTheme() {
  cssVar.style.setProperty('--orgnlColor', 'white');
  cssVar.style.setProperty('--inverseColor', 'black');
  cssVar.style.setProperty('--titleColor', 'rgba(0, 0, 0, .8)');
  cssVar.style.setProperty('--tempColor', 'grey');
  cssVar.style.setProperty('--color3', 'hsl(0, 0%, 35%)');
  cssVar.style.setProperty('--textColor', 'hsla(0, 0%, 0%, .6)');
  cssVar.style.setProperty('--bgColorMain', 'white');
  cssVar.style.setProperty('--cardBgColor', 'white');
  cssVar.style.setProperty('--bgColor1', 'white');
  cssVar.style.setProperty('--lightShadow', 'hsla(235, 100%, 50%, 0.1)');
  cssVar.style.setProperty('--animating-color', 'hsla(272, 84%, 65%, 1)');
  cssVar.style.setProperty('--bgColorExternal', 'hsla(0, 0%, 93%, 1)');
  cssVar.style.setProperty('--linkColor', ' hsl(250, 90%, 46%)');

}



function checkTheme() {

  switch (localStorage.getItem("theme")) {
    case '2':
      darkTheme();
      break;

    default:
      localStorage.setItem("theme", '1');
  }

}

function toggleTheme() {
  //  hide_menu();
  show_snackbar("Dark theme temporarily unavailable 😕", 4000);

  /*
    switch (localStorage.getItem("theme"))
    {
      case '1':
        localStorage.setItem("theme", '2');
        darkTheme();
        break;

      case '2':
        localStorage.setItem("theme", '1');
        lightTheme();
        break;
        
    }
    */

}


//All the cookie handling
var cookie_banner = document.querySelector("#consent_banner");
setTimeout(toggleBanner, 2000);

function toggleBanner() {
  if (!localStorage.getItem("consent_status")) {
    cookie_banner.style.display = "block";
    cookie_banner.style.bottom = "10px";
  }
  else {
    cookie_banner.style.bottom = "-170px";
    setTimeout(() => {
      cookie_banner.style.display = "none";
    }, 2000);
  }
}

function set_cookie_status() {
  localStorage.setItem("consent_status", "allow");
  toggleBanner();
}


//hide topbar while scrolling down on mobile view
const top_bar = document.querySelector(".topBar");

let scrollY_live = window.scrollY;
let last_scrollY = 0;

function dynamize_topbar() {
  scrollY_live = window.scrollY;

  if ((scrollY_live - last_scrollY) > .3 && scrollY_live > 60)
    top_bar.style.top = "-60px";
  else if ((scrollY_live - last_scrollY) < -3 || scrollY_live < 60) //The first condition is for the sensitivity of the scroll
    top_bar.style.top = "0";

  last_scrollY = scrollY_live;
}

function topbar_dynamization_check()
{
  if (window.innerWidth > 700)
  {
    window.removeEventListener("scroll", dynamize_topbar);
    top_bar.style.top = "0";
  }
  else
    window.addEventListener("scroll", dynamize_topbar);

}

window.addEventListener("resize", topbar_dynamization_check)

window.addEventListener("load", topbar_dynamization_check);


// Snackbar/toast message code 
const snackbar = document.querySelector('.snackbar');
const progressbar = document.querySelector('.snackbar div');
const messageElement = document.querySelector('.snackbar p');
let timeoutId; // Variable to store the timeout ID

function show_snackbar(message, duration = 5000) {
  // Clear any existing timeout
  clearTimeout(timeoutId);

  messageElement.textContent = message;
  snackbar.style.left = "0";

  // Set the progress bar width to 100% and reset the transition
  progressbar.style.width = "100%";
  progressbar.style.transition = "width 0s";

  // After a small delay, set the progress bar width to 0 with the specified transition
  setTimeout(() => {
    progressbar.style.transition = `width ${duration / 1000}s linear`;
    progressbar.style.width = "0%";
  }, 100);

  // Automatically hide after the specified duration
  timeoutId = setTimeout(() => {
    snackbar.style.left = "-100%";
  }, duration + 100); // Add 100ms to ensure the animation completes
}