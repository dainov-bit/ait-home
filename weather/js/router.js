function router(path = "") {
  if (path == "settings/residence") {
    dom("#content")[0].innerHTML = settingsResidence();
    settingsResidenceAction();
  } else if (path == "settings/appid") {
    dom("#content")[0].innerHTML = settingsAppId();
    dom("#appid")[0].onsubmit = function (e) {
      e.preventDefault();
      db.settings.appid = this[0].value;
      alert("AppId успешно сохранен");
      router("settings");
    };
  } else if (path == "settings") {
    dom("#content")[0].innerHTML = settings();
  } else {
    residence();
  }
}
