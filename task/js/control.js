document.addEventListener("DOMContentLoaded", function () {
  let content = "#content";
  // Активируем главную страницу
  openUrl("index", content);
  /* На страницах ссылки представлены не в стандартном виде.
Каждая из них имеет класс link и атрибут data-href.
Задача проста, по нажатию на ссылку подгружать страницы.  */
  document.querySelectorAll(".link").forEach(function (element) {
    // Установим для ссылок tabindex
    element.setAttribute("tabindex", 0);
    // Слушаем нажатие
    element.onclick = function () {
      sound("click");
      openUrl(this.getAttribute("data-href"), content);
    };
  });
});
