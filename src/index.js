const dropdownArrow = document.querySelector(".category-dropdown-arrow");
const messageDiv = document.querySelector(".message-div");

const dropDownList = document.querySelector(".category-dropdown");
const overlayDiv = document.querySelector(".overlay");

function onloadHandler() {
  preloaderHandler()
  dropDownList.classList.add("hidden");
  overlayDiv.classList.add("hidden");
  preloaderHandler()
}
window.onload = onloadHandler;


dropdownArrow.addEventListener("click", function () {
  if (dropDownList.classList.contains("hidden")) {
    dropDownList.classList.remove("hidden");
    overlayDiv.classList.remove("hidden");
  } else {
    dropDownList.classList.add("hidden");
    overlayDiv.classList.add("hidden");
  }
});

overlayDiv.addEventListener("click", function () {
  if (overlayDiv.classList.contains("hidden")) {
    overlayDiv.classList.reomove("hidden");
    dropDownList.classList.remove("hidden");
  } else {
    dropDownList.classList.add("hidden");
    overlayDiv.classList.add("hidden");
  }
});

function addMessage(msg) {
  messageDiv.innerText = msg;
  messageDiv.classList.remove("hidden");
  
}

function removeMessage(msg) {
  messageDiv.innerText = "";
  messageDiv.classList.add("hidden");
}

function messageHandler(msg) {
  addMessage(msg);
  setTimeout(function(){
    removeMessage(msg)
  }, 3000);
}

const preloader = document.querySelector(".preloader");

function addPreloader(){
  preloader.classList.remove("hidden");
}

function removePreloader(){
  setTimeout(function(){
    preloader.classList.add("hidden");
  },3000)
}

function preloaderHandler(){
  addPreloader();
  removePreloader();
}