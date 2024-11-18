const title_string = document.querySelector('.artclTitle').innerHTML;
const title = encodeURIComponent(title_string);
const artcl_shareBtn = document.querySelector(".artclShareBtn");


//add event listener on artcl share btn
artcl_shareBtn.addEventListener('click', () => {
  setupShareBtns(title_string, page_url)
});


