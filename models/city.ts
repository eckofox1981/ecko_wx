export class City {
  name: string;
  lat: string;
  lon: string;
  country: string;
  state: string;
  constructor(
    name: string,
    lat: string,
    lon: string,
    country: string,
    state: string
  ) {
    this.name = name;
    this.lat = lat;
    this.lon = lon;
    this.country = country;
    this.state = state;
  }
}
