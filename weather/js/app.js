document.addEventListener("DOMContentLoaded", function () {
  let application_name = "Браузерный погодный радар";
  router("");
  dom("title")[0].innerHTML = application_name;
  dom("#header")[0].innerHTML = application_name;
});
