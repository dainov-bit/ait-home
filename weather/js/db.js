var db = {
  settings: {
    appid: "766334a88b03952335437dd375a4a5ea",
    residence: {
      lat: 0,
      lon: 0,
      time: 0,
      object: null,
    },
  },
  url: {
    q: (n) =>
      "https://api.openweathermap.org/data/2.5/weather?appid=" +
      db.settings.appid +
      "&lang=ru&units=metric&q=" +
      n,
    l: (l1, l2) =>
      "https://api.openweathermap.org/data/2.5/weather?appid=" +
      db.settings.appid +
      "&lang=ru&units=metric&lat=" +
      l1 +
      "&lon=" +
      l2,
    g: (city) =>
      "https://api.openweathermap.org/geo/1.0/direct?appid=" +
      db.settings.appid +
      "&lang=ru&q=" +
      city +
      "&limit=10",
  },
};
