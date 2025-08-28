

/*
Will return a random number in [min, max]
*/
export function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


/*
Waits how every many ms is given thru the param
*/
export async function waitThisLong(ms) {
  await new Promise((wait) => setTimeout(wait, ms));
  return;
}