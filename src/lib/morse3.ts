/**
 * Converts Morse code to text using nested if statements
 * This implementation uses a binary tree-like structure to narrow down the possible outcomes
 * @param morse The Morse code to convert to text
 * @returns The text representation of the Morse code
 */
export function morseToText(morse: string): string {
  // Split by multiple spaces and preserve them
  const parts = morse.split(/(\s+)/);
  let result = "";

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];

    // If it's a space sequence, add a single space between words
    if (/^\s+$/.test(part)) {
      if (part.length > 1) {
        // Multiple spaces indicate word boundary
        result += " ";
      }
      continue;
    }

    // Otherwise decode the morse code
    const code = part;

    // Root level: Check first character
    if (code === "") {
      continue;
    } else if (code === "/") {
      result += " ";
    } else if (code.startsWith("-")) {
      // Dash branch
      if (code.startsWith("--")) {
        // Dash-dash branch
        if (code.startsWith("---")) {
          // Dash-dash-dash branch
          if (code === "---") {
            result += "O";
          }
        } else if (code.startsWith("--..")) {
          // Dash-dash-dot-dot branch
          if (code === "--..") {
            result += "Z";
          }
        } else if (code.startsWith("--.")) {
          // Dash-dash-dot branch
          if (code === "--.-") {
            result += "Q";
          } else if (code === "--.") {
            result += "G";
          }
        } else if (code === "--") {
          result += "M";
        }
      } else if (code.startsWith("-.")) {
        // Dash-dot branch
        if (code.startsWith("-..")) {
          // Dash-dot-dot branch
          if (code === "-...") {
            result += "B";
          } else if (code === "-..") {
            result += "D";
          } else if (code === "-..-") {
            result += "X";
          }
        } else if (code.startsWith("-.-")) {
          // Dash-dot-dash branch
          if (code === "-.--") {
            result += "Y";
          } else if (code === "-.-.") {
            result += "C";
          } else if (code === "-.-") {
            result += "K";
          }
        } else if (code === "-.") {
          result += "N";
        }
      } else if (code === "-") {
        result += "T";
      }
    } else if (code.startsWith(".")) {
      // Dot branch
      if (code.startsWith("..")) {
        // Dot-dot branch
        if (code.startsWith("...")) {
          // Dot-dot-dot branch
          if (code === "....") {
            result += "H";
          } else if (code === "...") {
            result += "S";
          } else if (code === "...-") {
            result += "V";
          }
        } else if (code.startsWith("..-")) {
          // Dot-dot-dash branch
          if (code === "..-.") {
            result += "F";
          } else if (code === "..-") {
            result += "U";
          }
        } else if (code === "..") {
          result += "I";
        }
      } else if (code.startsWith(".-")) {
        // Dot-dash branch
        if (code.startsWith(".--")) {
          // Dot-dash-dash branch
          if (code === ".---") {
            result += "J";
          } else if (code === ".--.") {
            result += "P";
          } else if (code === ".--") {
            result += "W";
          }
        } else if (code.startsWith(".-.")) {
          // Dot-dash-dot branch
          if (code === ".-..") {
            result += "L";
          } else if (code === ".-.") {
            result += "R";
          }
        } else if (code === ".-") {
          result += "A";
        }
      } else if (code === ".") {
        result += "E";
      }
    } else {
      result += code; // Keep unknown codes as is
    }
  }

  return result;
}
