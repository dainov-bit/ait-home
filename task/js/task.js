let id = 3;
function genId() {
  id = id + 1;
  return id;
}
let task = {
  1: { id: 1, t: "Позвонить маме", s: false, d: Date.now() },
  2: { id: 2, t: "Сходить в магазин", s: false, d: Date.now() },
  3: { id: 3, t: "Позвонить в офис", s: false, d: Date.now() },
};
function objectTask(obj) {
  if (obj.s == true) {
    status = "Восстановить";
  } else {
    status = "Завершить";
  }
  let res = "";
  res += "<div class='list-group-item list-group-item-action'>";

  res +=
    "<p class='mb-1'><span class='task_text' data-id='" +
    obj.id +
    "'>" +
    obj.t +
    "</span></p>";
  res += "<div class='btn-group'>";
  res +=
    "<p><button class='btn btn-outline-primary action' data-btn='status' data-id='" +
    obj.id +
    "'>" +
    status +
    "</button>";
  res +=
    "<button class='btn btn-outline-secondary action' data-btn='edit' data-id='" +
    obj.id +
    "'>Редактор</button>";
  res +=
    "<button class='btn btn-outline-danger action' data-btn='delete' data-id='" +
    obj.id +
    "'>Удалить</button></p>";
  res += "</div></div><br>";
  return res;
}
// Далее создаем функцию, которая будет выводить наши объекты
function taskList() {
  let res = "";
  for (let k in task) {
    res += objectTask(task[k]); // Передали объект задачи для представления
  }
  document.getElementById("task_list").innerHTML = res;
}
function actionObjectButtons() {
  document.querySelectorAll(".action").forEach(function (element) {
    element.onclick = function () {
      let n = this.getAttribute("data-id");
      let btn = this.getAttribute("data-btn");
      if (btn == "status") {
        if (task[n].s == true) {
          task[n].s = false;
          this.innerHTML = "Завершить";
        } else {
          task[n].s = true;
          this.innerHTML = "Восстановить";
        }
        sound("click");
      } else if (btn == "delete") {
        if (confirm("Вы точно хотите удалить эту задачу?") == true) {
          delete task[n];
          taskList();
          actionObjectButtons();
          sound("click");
        }
      } else if (btn == "edit") {
        if (task[n].s == true) {
          prompt(
            "",
            "Внимание! Вы не можете редактировать задачи, которые завершены"
          );
          return FALSE;
        }
        document.getElementById("form_text").value = task[n].t;
        document.getElementById("form_text").focus();
        document.getElementById("form_x").style.display = "inline-block";
        document.getElementById("form_save").innerHTML = "Сохранить";
        document.getElementById("form_id").value = n;
        sound("click");
      }
    };
  });
}
