function sound(file) {
  let a = new Audio();
  a.src = "./sound/" + file + ".mp3";
  a.volume = 0.9;
  a.play();
}
function openUrl(url, content) {
  fetch("./pages/" + url + ".html")
    .then((response) => {
      if (response.ok) {
        return response.text();
      } else {
        sound("error");
        prompt("", 404);
        return false;
      }
    })
    .then((data) => {
      document.querySelectorAll(content)[0].innerHTML = data;
      if (url == "index") {
        setTimeout(function () {
          taskList();
        }, 1000);
        setTimeout(function () {
          actionObjectButtons();
        }, 1200);
      }
    })
    .catch((error) => {});
}
