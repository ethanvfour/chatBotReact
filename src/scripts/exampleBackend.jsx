const goodWords = new Set([
  "great",
  "excellent",
  "happy",
  "fantastic",
  "positive",
  "wonderful",
  "amazing",
  "nice",
  "love",
  "awesome",
  "brilliant",
  "cheerful",
  "delightful",
  "friendly",
  "helpful",
]);

const badWords = new Set([
  "bad",
  "terrible",
  "sad",
  "angry",
  "awful",
  "hate",
  "horrible",
  "worst",
  "annoying",
  "disgusting",
  "rude",
  "upset",
  "unhappy",
  "nasty",
  "mean",
]);

const possibleGreetings = new Set([
  "hello",
  "hi",
  "hey",
  "greetings",
  "good morning",
  "good afternoon",
  "good evening",
  "howdy",
  "yo",
  "sup",
  "what's up",
  "hiya",
  "hey there",
  "hello there",
  "hi there",
]);

const removeEnd = (msg) => {
  msg = msg.toLowerCase();
  if (msg[msg.length - 1] === "." || msg[msg.length - 1] === "!")
    return msg.slice(0, -1);
  return msg;
};

export function getTone(msg) {
  const tokens = removeEnd(msg).split(" ");
  let guess = 0,
    greeting = false;

  for (let i = 0; i < tokens.length; i++) {
    let lastTwo = i > 0 ? `${tokens[i - 1]} ${tokens[i]}` : "";
    if (possibleGreetings.has(tokens[i]) || possibleGreetings.has(lastTwo)) {
      greeting = true;
    }

    if (goodWords.has(tokens[i])) guess++;
    if (badWords.has(tokens[i])) guess--;
  }
  const returner = {
    msg : []
  };
  if (greeting) returner["msg"].push("greeting");

  if (guess > 0) returner["msg"].push("good");
  else if (guess < 0) returner["msg"].push("bad");
  else if(!greeting) returner["msg"].push("confused");

  return returner;
}
