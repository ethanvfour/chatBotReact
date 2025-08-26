export function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export async function waitThisLong(ms) {
  await new Promise((wait) => setTimeout(wait, ms));
  return;
}