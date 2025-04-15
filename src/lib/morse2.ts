/**
 * Converts Morse code to text using if statements instead of a map
 * @param morse The Morse code to convert to text
 * @returns The text representation of the Morse code
 */
export function morseToText(morse: string): string {
  // Split by multiple spaces and preserve them
  const parts = morse.split(/(\s+)/);
  let result = "";
  let lastPartWasLetter = false;

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];

    // If it's a space sequence, add a single space between words
    if (/^\s+$/.test(part)) {
      if (part.length > 1) {
        // Multiple spaces indicate word boundary
        result += " ";
      }
      lastPartWasLetter = false;
      continue;
    }

    // Otherwise decode the morse code
    const code = part;
    // Sorted by Morse code pattern (most dashes to most dots)
    if (code === "---") result += "O";
    else if (code === "--.-") result += "Q";
    else if (code === "--..") result += "Z";
    else if (code === "--.") result += "G";
    else if (code === "--") result += "M";
    else if (code === "-..-") result += "X";
    else if (code === "-..") result += "D";
    else if (code === "-.-.") result += "C";
    else if (code === "-.-") result += "K";
    else if (code === "-.--") result += "Y";
    else if (code === "-.") result += "N";
    else if (code === "-") result += "T";
    else if (code === "-...") result += "B";
    else if (code === "....") result += "H";
    else if (code === "...-") result += "V";
    else if (code === "...") result += "S";
    else if (code === "..-.") result += "F";
    else if (code === "..-") result += "U";
    else if (code === "..") result += "I";
    else if (code === ".---") result += "J";
    else if (code === ".--.") result += "P";
    else if (code === ".--") result += "W";
    else if (code === ".-..") result += "L";
    else if (code === ".-.") result += "R";
    else if (code === ".-") result += "A";
    else if (code === ".") result += "E";
    else if (code === "/") result += " ";
    else result += code; // Keep unknown codes as is

    lastPartWasLetter = true;
  }

  return result;
}
