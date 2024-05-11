function sound(file, volume = 0.9) {
  let a = new Audio();
  a.src = "./sound/" + file + ".mp3";
  a.volume = volume;
  a.play();
}

// Функция, которая открывает области контента.
function displayContent(data = "") {
  /* Для начала нужно пройти циклом по элементам.
Если нужный элемент найден, запоминаем его.
Все остальные элементы скрываем.
Если элемент не найден и при этом хэш не пустой, тогда нужно выводить 404
Если хэш пустой, тогда нужно сразу активировать главную страницу. */
  let cl = document.getElementsByClassName("pages");
  let indexObj = null; // Для запоминания главной страницы.
  let page404 = null; // Для запоминания страницы 404
  let ind = 0; // Принимает 0 или 1. Указывает, что элемент был найден
  for (i = 0; i <= cl.length - 1; i++) {
    let str = data.replace("#", "").trim();
    if (cl[i].getAttribute("content") == str) {
      cl[i].style.display = "block";
      ind = 1;
    } else {
      cl[i].style.display = "none";
    }
    if (cl[i].getAttribute("content") == "index") {
      indexObj = cl[i];
    }
    if (cl[i].getAttribute("content") == "not404") {
      page404 = cl[i];
    }
    str = "";
  }
  if (ind == 1) {
    return true;
  }
  // Элемент не найден.
  // Далее нужно понять, если хэш пустой, тогда открываем главную страницу.
  // Если не пустой, тогда выводим 404
  if (data.length == 0) {
    indexObj.style.display = "block";
  }
  // Если же не пуст
  else {
    page404.style.display = "block";
  }
}

// Слушаем событие на клик.
document.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName == "A") {
      sound("click");
      setTimeout(function () {
        displayContent(window.location.hash);
      }, 100);
    }
  },
  false
);
