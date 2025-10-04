export class CurrentWeather {
  dt: Date;
  sunrise: Date;
  sunset: Date;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  mainWeather: string;
  descriptionWeather: string;
  iconWeather: string;

  constructor(
    dt: Date,
    sunrise: Date,
    sunset: Date,
    temp: number,
    feels_like: number,
    pressure: number,
    humidity: number,
    dew_point: number,
    uvi: number,
    clouds: number,
    visibility: number,
    wind_speed: number,
    wind_deg: number,
    wind_gust : number;
    mainWeather: string,
    descriptionWeather: string,
    iconWeather: string
  ) {
    this.dt = dt;
    this.sunrise = sunrise;
    this.sunset = sunset;
    this.temp = temp;
    this.feels_like = feels_like;
    this.pressure = pressure;
    this.humidity = humidity;
    this.dew_point = dew_point;
    this.uvi = uvi;
    this.clouds = clouds;
    this.visibility = visibility;
    this.wind_speed = wind_speed;
    this.wind_deg = wind_deg;
    this.wind_gust = wind_gust;
    this.mainWeather = mainWeather;
    this.descriptionWeather = descriptionWeather;
    this.iconWeather = iconWeather;
  }
}

export class HourlyForeCast {
  dt: Date;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust : number;
  mainWeather: string;
  descriptionWeather: string;
  iconWeather: string;

  constructor(
    dt: Date,
    temp: number,
    feels_like: number,
    pressure: number,
    humidity: number,
    dew_point: number,
    uvi: number,
    clouds: number,
    visibility: number,
    wind_speed: number,
    wind_deg: number,
    wind_gust : number,
    mainWeather: string,
    descriptionWeather: string,
    iconWeather: string
  ) {
    this.dt = dt;
    this.temp = temp;
    this.feels_like = feels_like;
    this.pressure = pressure;
    this.humidity = humidity;
    this.dew_point = dew_point;
    this.uvi = uvi;
    this.clouds = clouds;
    this.visibility = visibility;
    this.wind_speed = wind_speed;
    this.wind_deg = wind_deg;
    this.wind_gust = wind_gust;
    this.mainWeather = mainWeather;
    this.descriptionWeather = descriptionWeather;
    this.iconWeather = iconWeather;
  }
}
