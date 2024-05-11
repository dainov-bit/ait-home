/* Класс, который управляет пользователями приложения */
class Users {
  constructor() {
    this.db = {}; // Колекция пользователей
  }
  // Генератор уникального номера
  genId() {
    let timestamp = Date.now();
    let res = timestamp;
    return res;
  }
  // Регистрация пользователя
  reg(obj) {
    let id = this.genId();
    let u = {
      id: id,
      name: obj["name"],
      surname: obj["surname"],
      money: 100.0,
      email: obj["email"],
      password: obj["password"],
      topUp: function (x = 10) {
        if (parseInt(x) < 10) {
          sound("error");
          alert("Ошибка! Нельзя пополнять счет меньше чем на 10 евро");
          return FALSE;
        }
        this.money = this.money + x;
      },
      withdraw: function (x) {
        let money = this.money - x;
        if (money < 0) {
          sound("error");
          alert("У вас нет денег");
        } else {
          this.money = money;
          sound("unhide");
          alert("Оплата прошла успешно");
        }
      },
    };
    this.db["id_" + id] = u;
  }
  // Поиск пользователя по разным данным
  search(query, type = "id") {
    for (let l in this.db) {
      if (type != "id") {
        if (this.db[l][type] == query) {
          return this.db[l];
        }
      } else {
        if (query == l.replace("id_", "")) {
          return this.db[l];
        }
      }
    }
    return false;
  }
  list() {
    let res = "<ul style='list-style-type:none'>";
    for (let i in this.db) {
      res +=
        "<li>" +
        this.db[i]["name"] +
        " " +
        this.db[i]["surname"] +
        ", " +
        this.db[i]["money"] +
        " euro</li>";
    }
    res += "</ul>";
    return res;
  }
}
