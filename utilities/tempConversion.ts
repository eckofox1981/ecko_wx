/**
 * converts base unit (Kelvin) to either Celsius or Farenheit.
 * conversion made on device since it is not ressource heavy, it avoids making a
 * new API call for the correct units and it allows for immediate formatting of
 * unit symbol (C or F)
 * @param tempUnits (either "celsius" or "farenheit")
 * @param temp (temp value in Kelvin)
 * @returns string: [converted temperature] + ° + [unit symbol (C or F)]
 */
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
