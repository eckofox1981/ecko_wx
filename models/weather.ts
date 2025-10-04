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

export class DailyForecast {
    dt : Date;
    sunrise : Date;
    sunset : Date;
    moon_phase: number;
    summary: string;
    tempDay: number;
    tempMin: number;
    tempMax: number;
    tempNight : number;
    tempEve : number;
    tempMorn: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    descriptionWeather : string;
    iconWeather: string;
    clouds: number;
    pop: number; //probability of precipitation
    rain: number;
    snow: number; //where available (in mm)
    uvi: number;

    constructor(
        dt : Date,
    sunrise : Date,
    sunset : Date,
    moon_phase: number,
    summary: string,
    tempDay: number,
    tempMin: number,
    tempMax: number,
    tempNight : number,
    tempEve : number,
    tempMorn: number,
    pressure: number,
    humidity: number,
    dew_point: number,
    wind_speed: number,
    wind_deg: number,
    wind_gust: number,
    descriptionWeather : string,
    iconWeather: string,
    clouds: number,
    pop: number, 
    rain: number,
    snow: number, 
    uvi: number,
    ) {
        this.dt = dt;
    this.sunrise = sunrise;
    this.sunset = sunset;
    this.moon_phase = moon_phase;
    this.summary = summary;
    this.tempDay  = tempDay;
    this.tempMin = tempMin;
    this.tempMax = tempMax;
    this.tempNight = tempNight;
    this.tempEve = tempEve;
    this.tempMorn = tempMorn;
    this.pressure = pressure;
    this.humidity = humidity;
    this.dew_point = dew_point;
    this.wind_speed = wind_speed;
    this.wind_deg = wind_deg;
    this.wind_gust = wind_gust;
    this.descriptionWeather = descriptionWeather;
    this.iconWeather = iconWeather;
    this.clouds = clouds;
    this.pop = pop; 
    this.rain = rain;
    this.snow = snow; 
    this.uvi = uvi;       
    }

}