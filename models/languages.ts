export class Language {
  id: string;
  home: string;
  favorites: string;
  settings: string;
  searchyourcity: string;
  getGPSlocation: string;
  time: string;
  temp: string;
  feelsLike: string;
  wind: string;
  gust: string;
  pressure: string;
  humidity: string;
  visibility: string;
  sunrise: string;
  sunset: string;
  bookmarkCity: string;
  bookmark: string;
  forecast: string;
  tapForDetails: string;
  youDeniedLocationPermission: string;

  constructor(
    id: string,
    home: string,
    favorites: string,
    settings: string,
    searchyourcity: string,
    getGPSlocation: string,
    time: string,
    temp: string,
    feelsLike: string,
    wind: string,
    gust: string,
    pressure: string,
    humidity: string,
    visibility: string,
    sunrise: string,
    sunset: string,
    bookmarkCity: string,
    bookmark: string,
    forecast: string,
    tapForDetails: string,
    youDeniedLocationPermission: string
  ) {
    this.id = id;
    this.home = home;
    this.favorites = favorites;
    this.settings = settings;
    this.searchyourcity = searchyourcity;
    this.getGPSlocation = getGPSlocation;
    this.time = time;
    this.temp = temp;
    this.feelsLike = feelsLike;
    this.wind = wind;
    this.gust = gust;
    this.pressure = pressure;
    this.humidity = humidity;
    this.visibility = visibility;
    this.sunrise = sunrise;
    this.sunrise = sunrise;
    this.sunset = sunset;
    this.bookmarkCity = bookmarkCity;
    this.bookmark = bookmark;
    this.forecast = forecast;
    this.tapForDetails = tapForDetails;
    this.youDeniedLocationPermission = youDeniedLocationPermission;
  }
}
