export class CurrentWeather {
  weatherMain: string;
  weatherDescription: string;
  weatherIcon: string;
  mainTemp: string;
  mainFeels_like: string;
  mainTemp_min: string;
  mainTemp_max: string;
  mainPressure: number;
  mainHumidity: number;
  mainSea_level: number;
  visibility: number;
  windSpeed: number;
  windDeg: number;
  windGust: number;
  rain1h: number | null;
  cloudsAll: number;
  dt: Date;
  sysSunrise: Date;
  sysSunset: Date;

  constructor(
    weatherMain: string,
    weatherDescription: string,
    weatherIcon: string,
    mainTemp: string,
    mainFeels_like: string,
    mainTemp_min: string,
    mainTemp_max: string,
    mainPressure: number,
    mainHumidity: number,
    mainSea_level: number,
    visibility: number,
    windSpeed: number,
    windDeg: number,
    windGust: number,
    rain1h: number | null,
    cloudsAll: number,
    dt: Date,
    sysSunrise: Date,
    sysSunset: Date
  ) {
    this.weatherMain = weatherMain;
    this.weatherDescription = weatherDescription;
    this.weatherIcon = weatherIcon;
    this.mainTemp = mainTemp;
    this.mainFeels_like = mainFeels_like;
    this.mainTemp_min = mainTemp_min;
    this.mainTemp_max = mainTemp_max;
    this.mainPressure = mainPressure;
    this.mainHumidity = mainHumidity;
    this.mainSea_level = mainSea_level;
    this.visibility = visibility;
    this.windSpeed = windSpeed;
    this.windDeg = windDeg;
    this.windGust = windGust;
    this.rain1h = rain1h;
    this.cloudsAll = cloudsAll;
    this.dt = dt;
    this.sysSunrise = sysSunrise;
    this.sysSunset = sysSunset;
  }
}

export class ThreeHoursForeCast {
  dt: Date;
  mainTemp: string;
  mainFeels_like: string;
  mainTemp_min: string;
  mainTemp_max: string;
  mainPressure: number;
  mainSea_level: number;
  mainHumidity: number;
  weatherMain: string;
  weatherDescription: string;
  weatherIcon: string;
  cloudsAll: number;
  windSpeed: number;
  windDeg: number;
  windGust: number;
  visibilty: number;
  pop: number;
  rain3h: number | null;
  snow3h: number | null;

  constructor(
    dt: Date,
    mainTemp: string,
    mainFeels_like: string,
    mainTemp_min: string,
    mainTemp_max: string,
    mainPressure: number,
    mainHumidity: number,
    mainSea_level: number,
    weatherMain: string,
    weatherDescription: string,
    weatherIcon: string,
    cloudsAll: number,
    windSpeed: number,
    windDeg: number,
    windGust: number,
    visibilty: number,
    pop: number,
    rain3h: number | null,
    snow3h: number | null
  ) {
    this.dt = dt;
    this.mainTemp = mainTemp;
    this.mainFeels_like = mainFeels_like;
    this.mainTemp_min = mainTemp_min;
    this.mainTemp_max = mainTemp_max;
    this.mainPressure = mainPressure;
    (this.mainHumidity = mainHumidity), (this.mainSea_level = mainSea_level);
    this.weatherMain = weatherMain;
    this.weatherDescription = weatherDescription;
    this.weatherIcon = weatherIcon;
    this.cloudsAll = cloudsAll;
    this.windSpeed = windSpeed;
    this.windDeg = windDeg;
    this.windGust = windGust;
    this.visibilty = visibilty;
    this.pop = pop;
    this.rain3h = rain3h;
    this.snow3h = snow3h;
  }
}
