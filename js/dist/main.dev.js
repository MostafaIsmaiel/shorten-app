"use strict";

var url = document.getElementById("url"),
    shortenBtn = document.getElementById("shorten"),
    form = document.getElementById("form"),
    container = document.getElementById("link-container"),
    load = document.getElementById("load");

function fetchApi(e) {
  e.preventDefault();

  if (url.value.trim() === "") {
    form.classList.add("error");
  } else if (url.value.trim() !== "") {
    form.classList.remove("error");
    var val = new RegExp("^(https?:\\/\\/)?" + "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + "((\\d{1,3}\\.){3}\\d{1,3}))" + "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + "(\\?[;&a-z\\d%_.~+=-]*)?" + "(\\#[-a-z\\d_]*)?$", "i");

    if (val.test(url.value.trim())) {
      load.style.display = "flex";
      document.body.style.overflow = "hidden";
      fetch("https://api.shrtco.de/v2/shorten?url=".concat(url.value)).then(function (response) {
        return response.json();
      }).then(function (data) {
        var link = "\n            <div class=\"link\">\n              <span class=\"enter-link\">".concat(data.result.original_link, "</span>\n              <div class=\"result\">\n                <span class=\"result-link\">").concat(data.result.full_short_link, "</span>\n                <button class=\"btn copy \">Copy</button>\n              </div>\n            ");
        container.innerHTML += link;
        load.style.display = "none";
        document.body.style.overflow = "visible";
        url.value = "";
      });
    } else {
      form.classList.add("error");
    }
  }
} // Copy url


function copy(e) {
  if (e.target.innerHTML.toLowerCase() === "copy") {
    // console.log(e.target.previousElementSibling.innerHTML);
    var target = e.target.previousElementSibling,
        inputEl = document.createElement("input");
    inputEl.setAttribute("value", target.innerText);
    document.body.appendChild(inputEl);
    inputEl.select();
    document.execCommand("copy");
    inputEl.parentNode.removeChild(inputEl);
    e.target.classList.add("copied");
    e.target.innerText = "Copied!";
  }
} // Add event listener


shortenBtn.addEventListener("click", fetchApi);
container.addEventListener("click", copy);