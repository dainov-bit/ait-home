// Функция, которая сократит длину методов для поиска элементов в dom
function dom(s) {
  return document.querySelectorAll(s);
}
function request(url, func) {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      func(data);
    })
    .catch((error) => {
      prompt("", error);
    });
}
