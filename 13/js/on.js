let userObject = null; // Для хранения пользователя.
let u = new Users();
u.reg({
  name: "Admin",
  surname: "Adminov",
  email: "admin@webpay.de",
  password: "12345",
  admin: true,
});
function infoAccount() {
  document.getElementById("cabinet").style.display = "block";
  document.getElementById("author").style.display = "none";
  document.getElementById("account_name").innerHTML = userObject.name;
  document.getElementById("account_surname").innerHTML = userObject.surname;
  document.getElementById("account_money").innerHTML = userObject.money;
  document.getElementById("account_id").innerHTML = userObject.id;
  document.getElementById("shopping_basket").style.display = "block";
  document.getElementById("shopping_basket_status").innerHTML =
    userObject.totalPrice();
}
document.getElementById("form_reg").onsubmit = function (e) {
  e.preventDefault();
  // Получим данные из формы.
  let email = this[0].value;
  let password = this[1].value;
  let name = this[2].value;
  let surname = this[3].value;
  // Выполняем поиск по email
  let search = u.search(email, "email");
  if (search == true) {
    sound("error");
    alert("Ошибка! Участник с таким email уже зарегистрирован");
    return FALSE;
  }
  // участника нет с таким email, тогда нужно его зарегистрировать.
  u.reg({ name: name, surname: surname, email: email, password: password });
  let user = u.search(email, "email");
  if (user != false && user.password == password) {
    userObject = user;
    infoAccount();
    this[0].value = "";
    this[1].value = "";
    this[2].value = "";
    this[3].value = "";
    sound("start");
    displayContent();
    window.location.hash = "#index";
  } else {
    sound("error");
    alert(
      "Ошибка! Неудалось после регистрации авторизировать пользователя. Попробуйте авторизироваться вручную"
    );
  }
};

document.getElementById("author_form").onsubmit = function (e) {
  e.preventDefault();
  // поищим пользователя по email.
  let email = this[0].value;
  let user = u.search(email, "email");
  if (user == false) {
    sound("error");
    alert("Нет такого пользователя");
    return FALSE;
  }
  // Если пользователь есть, тогда сравним пароли
  if (user.password === this[1].value) {
    userObject = user;
    infoAccount();
    this[0].value = "";
    this[1].value = "";
    sound("start");
  } else {
    sound("error");
    alert("Неверный пароль");
  }
};
document.getElementById("exit").onclick = function () {
  userObject = null;
  document.getElementById("cabinet").style.display = "none";
  document.getElementById("author").style.display = "block";
  document.getElementById("shopping_basket").style.display = "none";
  sound("exit");
};
document.getElementById("top_up").onclick = function () {
  userObject.topUp();
  document.getElementById("account_money").innerHTML = userObject.money;
  sound("money", 0.5);
};
document.getElementById("shopping_basket").onclick = function () {
  userObject.showBasket();
};
