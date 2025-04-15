// Morse code dictionary
const MORSE_CODE: { [key: string]: string } = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  "0": "-----",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  " ": "/",
};

// Reverse morse code dictionary for decoding
const REVERSE_MORSE: { [key: string]: string } = Object.entries(
  MORSE_CODE
).reduce((acc, [key, value]) => ({ ...acc, [value]: key }), {});

export function textToMorse(text: string): string {
  return text
    .toUpperCase()
    .split("")
    .map((char) => MORSE_CODE[char] || char)
    .join(" ");
}

/**
 * Converts Morse code to text using if statements instead of a map
 * @param morse The Morse code to convert to text
 * @returns The text representation of the Morse code
 */
export function morseToText(morse: string): string {
  // Split by multiple spaces to separate words
  return morse
    .split(/\s{2,}/)
    .map((word) =>
      word
        .trim()
        .split(" ")
        .map((code) => REVERSE_MORSE[code] || code)
        .join("")
    )
    .join(" ");
}
