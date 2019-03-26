function setConfig() {
  
  var texts = {
    "title": "Shopping Control"
  }

  document.title = texts.title;
  document.querySelector("#nav-title").insertAdjacentHTML("beforeend", texts.title);
}

setConfig();