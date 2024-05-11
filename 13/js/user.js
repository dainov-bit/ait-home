/* Класс, который управляет пользователями приложения */
class Users {
  constructor() {
    this.db = {}; // Колекция пользователей
  }
  // Список всех пользователей.
  allUsers() {
    return this.db;
  }
  // Генератор уникального номера
  genId() {
    let timestamp = Date.now();
    let res = timestamp;
    return res;
  }
  // Обработка корзины
  basket(b, o) {
    let basketDom = document.getElementById("shopping_basket_status");
    // первое свойство ссылка на корзину пользователя. Второе свойство - это сам товар.
    // Нужно пройти по объектам корзины и проверить, есть ли в корзине уже такой объект.
    let i = false;
    Object.entries(b).forEach(function ([key, val]) {
      if (val["product"]["product_id"] == o["product_id"]) {
        val["product"]["product_quantity"]--;
        val["quantity"]++;
        i = true;
        val["price"] = val["price"] + val.product.product_price;
        basketDom.innerHTML = userObject.pricePlus(val.product.product_price);
      }
    });
    if (i == true) {
      return true;
    } else {
      let basket_id = Date.now();
      let p = {
        product: o,
        quantity: 1,
        price: o.product_price,
      };

      b["id_" + basket_id] = p;
      o.product_quantity--;
      basketDom.innerHTML = userObject.pricePlus(o.product_price);
    }
  }

  basketButtonMinus(b) {
    let bm = document.getElementsByClassName("basket_minus");
    for (let i = 0; i <= bm.length - 1; i++) {
      bm[i].onclick = function () {
        let content = this.getAttribute("content");
        let obj = b[content];
        let price = obj.price - obj.product.product_price;
        obj.price = price;
        userObject.priceMinus(obj.product.product_price);
        obj.quantity--;
        obj.product.product_quantity++;
        document.getElementById("shopping_basket_status").innerHTML =
          userObject.totalPrice();
        sound("click");
        userObject.showBasket();
      };
    }
  }
  basketButtonPlus(b) {
    let bm = document.getElementsByClassName("basket_plus");
    for (let i = 0; i <= bm.length - 1; i++) {
      bm[i].onclick = function () {
        let content = this.getAttribute("content");
        let obj = b[content];
        let price = obj.price + obj.product.product_price;
        obj.price = price;
        userObject.pricePlus(obj.product.product_price);
        obj.quantity++;
        obj.product.product_quantity--;
        document.getElementById("shopping_basket_status").innerHTML =
          userObject.totalPrice();
        sound("click");
        userObject.showBasket();
      };
    }
  }

  basketButtonDelete(b) {
    let bd = document.getElementsByClassName("basket_delete");
    for (let i = 0; i <= bd.length - 1; i++) {
      bd[i].onclick = function () {
        sound("click");
        if (
          confirm("Вы точно хотите удалить этот продукт из вашей корзины?") ==
          true
        ) {
        } else {
          return FALSE;
        }

        let content = this.getAttribute("content");
        let obj = b[content];
        obj.product.product_quantity =
          obj.product.product_quantity + obj.quantity;
        userObject.priceMinus(obj.price);
        document.getElementById("shopping_basket_status").innerHTML =
          userObject.totalPrice();
        delete b[content];
        userObject.showBasket();
      };
    }
  }
  basketDelete(b) {
    for (let i in b) {
      delete b[i];
    }
  }
  // Метод выводит список товаров для корзины.
  sb(b) {
    let res = "";
    res +=
      "<table border='1'><tr><th>Товар</th><th>Количество</th><th>Цена за шт</th><th>Общая цена</th><th>Действие</th></tr>";
    Object.entries(b).forEach(function ([key, val]) {
      let button_minus = "";
      let button_plus = "";
      if (val["quantity"] > 1) {
        button_minus =
          "<button class='basket_minus' content='" + key + "'>-</button>";
      }
      if (val["product"]["product_quantity"] > 0) {
        button_plus =
          "<button class='basket_plus' content='" + key + "'>+</button>";
      }
      res += "<tr><td>" + val["product"]["product_name"] + "</td>";
      res +=
        "<td>" +
        button_minus +
        " (" +
        val["quantity"] +
        ") " +
        button_plus +
        "</td>";
      res +=
        "<td>" +
        val["product"]["product_price"] +
        " <span lang='de'>€</span></td>";
      res += "<td>" + val["price"] + " <span lang='de'>€</span></td>";
      res +=
        "<td><button class='basket_delete' content='" +
        key +
        "'>Удалить</button></td></tr>";
    });
    res += "</table><br>";

    res += "<h3>Итоговый результат</h3>";
    res +=
      "<p>Общая сумма: <span id='bm'>" +
      userObject.totalPrice() +
      "</span> <span lang='de'>€</span></p>";
    res += "<p><button id='basket_completed'>Совершить покупку</button></p>";
    let thisobj = this;
    document.getElementById("basket_result").innerHTML = res;
    document.getElementById("basket_completed").onclick = function () {
      let elem = document.getElementsByClassName("basket_delete");
      if (elem.length == 0) {
        sound("error");
        alert("И что же вы решили купить? Ваша корзина пуста.");
        return FALSE;
      }
      if (userObject.withdraw(userObject.totalPrice()) == true) {
        thisobj.basketDelete(b);
        sound("unhide");
        alert("Сделка совершена успешно");
        infoAccount();
        userObject.priceMinus(userObject.totalPrice());
        document.getElementById("shopping_basket_status").innerHTML =
          userObject.totalPrice();
        userObject.showBasket();
      } else {
        sound("error");
        alert(
          "У вас нет столько денег, чтобы выкупить все продукты из вашей корзины."
        );
      }
    };

    setTimeout(function () {
      thisobj.basketButtonMinus(b);
      thisobj.basketButtonPlus(b);
      thisobj.basketButtonDelete(b);
    }, 1000);
  }
  // Регистрация пользователя
  reg(obj) {
    let id = this.genId();
    let thisobj = this;
    let u = {
      id: id,
      name: obj["name"],
      surname: obj["surname"],
      money: 100.0,
      email: obj["email"],
      password: obj["password"],
      admin: obj["admin"],
      basket_price: 0.0,
      totalPrice: function () {
        return this.basket_price;
      },
      basket: {},
      basketForShop: function () {
        return this.basket;
      },
      addBasket: function (obj) {
        thisobj.basket(this.basket, obj);
      },
      showBasket: function () {
        thisobj.sb(this.basket);
      },

      pricePlus: function (price) {
        return (this.basket_price = this.basket_price + price);
      },
      priceMinus: function (price) {
        return (this.basket_price = this.basket_price - price);
      },

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
          return false;
        } else {
          this.money = money;
          return true;
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
