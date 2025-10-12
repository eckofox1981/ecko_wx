export function tempConversion(tempUnits: string, temp: number) {
  if (tempUnits === "celsius") {
    const celsius = Math.floor((temp - 273.15) * 10) / 10;
    return celsius + "°C";
  }

  if (tempUnits === "farenheit") {
    const farenheit = Math.floor(((9 / 5) * (temp - 273.15) + 32) * 10) / 10;
    return farenheit + "°F";
  }

  return temp + "°K";
}
