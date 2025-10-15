/**
 * Formats Date to display time properly (ex: 02:09 instead of 2:9)
 * @param time : Date
 * @returns string [hours] + : + [minutes]
 */
export function timeFormating(time: Date) {
  let hours: string;
  let minutes: string;

  if (time.getHours() < 10) {
    hours = "0" + time.getHours();
  } else {
    hours = `${time.getHours()}`;
  }

  if (time.getMinutes() < 10) {
    minutes = "0" + time.getMinutes();
  } else {
    minutes = `${time.getMinutes()}`;
  }

  return hours + ":" + minutes;
}
