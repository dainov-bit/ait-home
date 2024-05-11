function windSpeed(obj) {
  let result = "";
  let ws = Math.round(obj.wind.speed);
  if (ws >= 0) {
    let speed_km = 60 * obj.wind.speed * 60;
    let speed_km_result = speed_km / 1000;
    let gust_km = obj.wind.gust / 1000;
    let gust_km_result = gust_km * 3600;
    result +=
      "<li class='list-group-item'>Скорость ветра: " +
      speed_km_result.toFixed(2) +
      " КМ/Ч, " +
      obj.wind.speed.toFixed(2) +
      " М/С</li>";
    result +=
      "<li class='list-group-item'>Порывы: " +
      gust_km_result.toFixed(2) +
      " КМ/Ч, " +
      obj.wind.gust.toFixed(2) +
      " М/С</li>";
  } else {
  }
  return result;
}
function tempData(d) {
  let result = Math.round(d);
  if (result > 0) {
    return "+" + result + " &deg; ";
  } else if (result < 0) {
    return "-" + result + " &deg; ";
  } else {
    return result + " &deg; ";
  }
}
function weather(obj) {
  let result = "";
  let temp = tempData(obj.main.temp);
  let feels_like = tempData(obj.main.feels_like);

  result +=
    "<p><img src='https://openweathermap.org/img/wn/" +
    obj.weather[0]["icon"] +
    ".png' alt='" +
    obj.weather[0]["main"] +
    "'> " +
    obj.weather[0]["description"] +
    " ";
  result +=
    Math.round(obj.main.temp) == Math.round(obj.main.feels_like)
      ? temp
      : temp + ", однако, Ощущается как " + feels_like;
  result += "</p>";
  result += "<h3>Подробности</h3>";
  result += "<ul class='list-group'>";
  result +=
    "<li class='list-group-item'>Давление: " + obj.main.pressure + " ГПА</li>";
  result +=
    "<li class='list-group-item'>Влажность: " + obj.main.humidity + " %</li>";
  result +=
    "<li class='list-group-item'>Видимость: " +
    obj.visibility / 1000 +
    " КМ</li>";
  result += windSpeed(obj);

  result += "</ul>";
  return result;
}
function residence() {
  if (db.settings.residence.lat == 0 && db.settings.residence.lon == 0) {
    dom("#content")[0].innerHTML =
      "<h2>Внимание!</h2><p>Пожалуйста перейдите в настройки и установите населенный пункт в прописке</p>";
  } else {
    request(
      db.url.l(db.settings.residence.lat, db.settings.residence.lon),
      function (data) {
        db.settings.residence.object = data;
      }
    );
    dom("#content")[0].innerHTML = "<p>Загрузка данных</p>";
    let i = setInterval(function () {
      if (
        typeof db.settings.residence.object == "object" &&
        db.settings.residence.object != null
      ) {
        clearInterval(i);
        dom("#content")[0].innerHTML =
          "<h2>Погода в населенном пункте " +
          db.settings.residence.object.name +
          "</h2>" +
          weather(db.settings.residence.object);
      }
    }, 1000);
  }
}

function settings() {
  let result = "<h2>Настройки</h2>";
  result += "<ul class='list-group'>";
  result +=
    "<li class='list-group-item'><a tabindex='0' onclick=\"router('settings/appid');\">AppId</a></li>";
  result +=
    "<li class='list-group-item'><a tabindex='0' onclick=\"router('settings/residence');\">Прописка</a></li>";
  result += "</ul>";
  return result;
}
function settingsAppId() {
  let result = "";
  result +=
    "<h2>Настройка AppId</h2><form id='appid'><input class='form-control' value='" +
    db.settings.appid +
    "' type='text' name='appid' placeholder='Введите AppId'> <button class='btn btn-primary' type='submit'>Сохранить</button></form><p><a tabindex='0' onclick=\"router('settings');\">Вернуться</a></p>";
  return result;
}
function settingsResidence() {
  let result = "";
  result += "<h2>Настройка прописки</h2><form id='residence'>";
  result +=
    "<p><label><input class='form-control' type='text' name='city' placeholder='Введите название населенного пункта'></label><br>";
  result += "<button class='btn btn-primary' type='submit'>Искать</button></p>";
  result += "</form><div id='residence_content'></div>";
  return result;
}
function actionSaveResidence(lat, lon, name) {
  if (
    confirm(
      "Внимание! Вы точно хотите установить населенный пункт, " +
        name +
        ", как место вашей прописки?"
    ) == true
  ) {
    db.settings.residence.lat = lat;
    db.settings.residence.lon = lon;
    db.settings.residence.time = 0; // Последняя метка времени запроса к серверам
    db.settings.residence.object = null; // Храним ответ с сервера openweathermap
    alert("Населенный пункт установлен как место вашей прописки");
    router();
  }
}
function settingsResidenceAction() {
  dom("#residence")[0].onsubmit = function (e) {
    e.preventDefault();
    let city = this[0].value;
    request(db.url.g(city), function (data) {
      let result = "";
      result += "<ul class='list-group'>";
      for (let key in data) {
        result +=
          "<li class='list-group-item'><a tabindex='0' onclick=\"actionSaveResidence('" +
          data[key].lat +
          "','" +
          data[key].lon +
          "','" +
          data[key].name +
          " (" +
          data[key].state +
          " " +
          data[key].country +
          ")');\">" +
          data[key].name +
          " (" +
          data[key].state +
          " " +
          data[key].country +
          ")</a></li>";
      }

      result += "</ul>";
      dom("#residence_content")[0].innerHTML = result;
    });
  };
}
