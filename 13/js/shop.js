/* Класс, который управляет товаром */
class Shop {
  constructor() {
    this.products = {}; // храним продукты
    this.count = 0; // для формирования id
    this.sort_type = "default"; // тип сортировки
    this.search = ""; // строка для поиска
  }
  // Метод, который добовляет продукт
  add(obj) {
    let id = Date.now() + "" + this.count; // Сформировали id
    let p = {
      product_id: id,
      product_name: obj["name"],
      product_price: obj["price"],
      product_quantity: obj["quantity"],
    };
    this.products["id_" + id + "_" + this.count] = p; // Добавили в базу
    this.count++;
  }
  // Редактирование продукта
  editor() {
    let thisobj = this; // Передаем экземпляр класса далее в глубь анонимных функций
    let elem = document.getElementsByClassName("product_edit"); // Вызываем все кнопки для активации редактора
    for (let i = 0; i <= elem.length - 1; i++) {
      elem[i].onclick = function () {
        let content = this.getAttribute("content");
        let name = prompt(
          "Введите название",
          thisobj.products[content].product_name
        );
        if (name.length <= 0) {
          alert("Название не должно быть пустым");
          return FALSE;
        }
        let price = prompt(
          "Введите цену",
          thisobj.products[content].product_price
        );
        if (name.length <= 0) {
          alert("Цена не может быть пустой");
          return FALSE;
        }
        let quantity = prompt(
          "Введите количество",
          thisobj.products[content].product_quantity
        );
        if (quantity.length <= 0) {
          alert(
            "Строка для количества не должна быть пустой. Можно вводить все цифры"
          );
          return FALSE;
        }
        thisobj.products[content].product_name = name;
        thisobj.products[content].price = parseFloat(price);
        thisobj.products[content].product_quantity = parseInt(quantity);
        alert("Товар успешно отредактирован");
        sound("click");
        thisobj.list(); // обновили список товаров
      };
    }
  }
  // Метод, который удаляет товар из магазина
  del(content) {
    // Задача. Пройти по корзинам пользователей и удалить объект.
    let data = u.allUsers(); // получили информацию о всех участниках
    for (let uid in data) {
      Object.entries(data[uid].basket).forEach(function ([key, val]) {
        // Попали в корзину
        if (val["product"]["product_id"] == content.product_id) {
          // нашли товар в корзине
          data[uid].priceMinus(val["price"]); // отняли стоимость
          delete data[uid].basket[key]; // удалили из корзины у участника
        }
      });
    }
  }
  // Метод связан с удалением товара, однако он обрабатывает нажатие кнопок
  deleted() {
    let thisobj = this;
    let del = document.getElementsByClassName("product_delete");
    for (let i = 0; i <= del.length - 1; i++) {
      del[i].onclick = function () {
        if (confirm("Вы точно хотите удалить этот продукт?") == true) {
          let content = this.getAttribute("content");
          thisobj.del(thisobj.products[content]);
          delete thisobj.products[content]; // удалили продукт из магазина
          document.getElementById("shopping_basket_status").innerHTML =
            userObject.totalPrice();
          alert("Продукт удален");
          sound("click");
          thisobj.list();
        }
      };
    }
  }
  // Метод, который добовляет товар в магазин
  newProduct() {
    let thisobj = this;
    document.getElementById("shop_new").onclick = function () {
      let name = prompt("Введите название");
      if (name.length <= 0) {
        alert("Название не должно быть пустым");
        return FALSE;
      }
      let price = prompt("Введите цену");
      if (name.length <= 0) {
        alert("Цена не может быть пустой");
        return FALSE;
      }
      let quantity = prompt("Введите количество");
      if (quantity.length <= 0) {
        alert(
          "Строка для количества не должна быть пустой. Можно вводить все цифры"
        );
        return FALSE;
      }
      thisobj.add({ name: name, price: parseFloat(price), quantity: quantity });
      alert("Продукт успешно добавлен");
      sound("click");
      thisobj.list();
    };
  }
  // Метод добовляет форму для сортировки
  formSort() {
    let res = "";
    res += "<p><label for='sort_data'>Сортировка: </label>";
    res += "<select id='sort_data'>";
    res += "<option value='default'>По умолчанию</option>";
    res += "<option value='price_desc'>Цена. От большой к меньшей</option>";
    res += "<option value='price'>Цена. От меньшей к большой</option>";
    res +=
      "<option value='quantity_desc'>Количество. В начале те, у которых больше</option>";
    res +=
      "<option value='quantity'>Количество. В начале те, у которых меньше</option>";
    res += "</select> <button id='sort_object'>Сортировать</button></p>";
    return res;
  }
  // Метод, который назначает тип сортировки
  actionSort() {
    document.getElementById("sort_data").value = this.sort_type;

    let thisobj = this;
    document.getElementById("sort_object").onclick = function () {
      let t = document.getElementById("sort_data");
      thisobj.sort_type = t.value;
      sound("click");
      thisobj.list();
    };
  }
  // Метод, который выполняет сортировку
  sortInstall() {
    if (this.sort_type == "price_desc") {
      let dataArray = Object.entries(this.products);
      dataArray.sort((a, b) => b[1].product_price - a[1].product_price);
      this.products = Object.fromEntries(dataArray);
    } else if (this.sort_type == "price") {
      let dataArray = Object.entries(this.products);
      dataArray.sort((a, b) => a[1].product_price - b[1].product_price);
      this.products = Object.fromEntries(dataArray);
    } else if (this.sort_type == "quantity_desc") {
      let dataArray = Object.entries(this.products);
      dataArray.sort((a, b) => b[1].product_quantity - a[1].product_quantity);
      this.products = Object.fromEntries(dataArray);
    } else if (this.sort_type == "quantity") {
      let dataArray = Object.entries(this.products);
      dataArray.sort((a, b) => a[1].product_quantity - b[1].product_quantity);
      this.products = Object.fromEntries(dataArray);
    } else if (this.sort_type == "default") {
      let dataArray = Object.entries(this.products);
      dataArray.sort(
        (a, b) => parseInt(a[1].product_id) - parseInt(b[1].product_id)
      );
      this.products = Object.fromEntries(dataArray);
    }
  }
  // Большой метод, который выводит продукты на экран
  list() {
    let thisobj = this;

    if (userObject == null) {
      // Для гостей запрет
      document.getElementById("shop_result").innerHTML =
        "<p>Для гостей товары не доступны</p>";
    } else {
      let res = "";
      if (userObject.admin == true) {
        res += "<p><button id='shop_new'>Добавить новый товар</button>  </p>";
        setTimeout(function () {
          thisobj.newProduct();
        }, 1000);
      }
      res += "<form id='shop_search'>";
      res +=
        "<p><input type='text'  placeholder='Введите имя товара для поиска' value='" +
        this.search +
        "'> ";
      res += "<button type='submit' >Искать</button></p> </form>";
      res += this.formSort();
      this.sortInstall();
      for (let o in this.products) {
        if (
          this.products[o]["product_name"]
            .toLowerCase()
            .includes(this.search) == true ||
          this.search.length == 0
        ) {
          res += "<h3>" + this.products[o]["product_name"] + "</h3>";
          res +=
            "<p>" +
            this.products[o]["product_price"] +
            " <span lang='de'>€</span></p>";
          res +=
            "<p>Количество: " + this.products[o]["product_quantity"] + "</p>";
          res +=
            "<p><button  class='shopping_basket' content='" +
            o +
            "'>Добавить в корзину</button> ";
          if (userObject.admin == true) {
            res +=
              "<button class='product_edit' content='" +
              o +
              "'>Редактор</button> ";
            res +=
              "<button class='product_delete' content='" +
              o +
              "'>Удалить</button> ";
          }
          res += "</p><br>";
        }
      }
      document.getElementById("shop_result").innerHTML = res;
      if (userObject.admin == true) {
        this.editor();
        this.deleted();
      }
      document.getElementById("shop_search").onsubmit = function () {
        thisobj.search = this[0].value;
        sound("click");
        thisobj.list();
      };
      let buttons = document.getElementsByClassName("shopping_basket");
      for (let i = 0; i <= buttons.length - 1; i++) {
        buttons[i].onclick = function () {
          sound("click");
          let product = thisobj.products[this.getAttribute("content")];
          if (product.product_quantity <= 0) {
            sound("error");
            alert("больше нет этого товара");
          } else {
            userObject.addBasket(product);
            thisobj.list();
          }
        };
      }
      this.actionSort();
    }
  }
}
let shop = new Shop(userObject);
shop.add({ name: "Зарядка 30!", price: 30.0, quantity: 5 });
shop.add({ name: "Зарядка 15!", price: 15.0, quantity: 5 });
shop.add({ name: "Зарядка 50!", price: 50.0, quantity: 5 });
shop.add({ name: "Наушники JBL", price: 75.0, quantity: 5 });
shop.add({
  name: "Калонка JBL BOOMBOX3, Цвет черный",
  price: 379.99,
  quantity: 5,
});
shop.list();

document.getElementById("shop_link").addEventListener("click", function () {
  shop.list();
});
