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
    } else {
      if (code === "/") {
        result += " ";
      } else {
        if (code.startsWith("-")) {
          // Dash branch
          if (code.startsWith("--")) {
            // Dash-dash branch
            if (code.startsWith("---")) {
              // Dash-dash-dash branch
              result += "O";
            } else {
              if (code.startsWith("--..")) {
                // Dash-dash-dot-dot branch
                result += "Z";
              } else {
                if (code.startsWith("--.")) {
                  // Dash-dash-dot branch
                  if (code.startsWith("--.-")) {
                    result += "Q";
                  } else {
                    result += "G";
                  }
                } else {
                  result += "M";
                }
              }
            }
          } else {
            if (code.startsWith("-.")) {
              // Dash-dot branch
              if (code.startsWith("-..")) {
                // Dash-dot-dot branch
                if (code.startsWith("-...")) {
                  result += "B";
                } else {
                  if (code.startsWith("-..-")) {
                    result += "X";
                  } else {
                    result += "D";
                  }
                }
              } else {
                if (code.startsWith("-.-")) {
                  // Dash-dot-dash branch
                  if (code.startsWith("-.--")) {
                    result += "Y";
                  } else {
                    if (code.startsWith("-.-.")) {
                      result += "C";
                    } else {
                      result += "K";
                    }
                  }
                } else {
                  result += "N";
                }
              }
            } else {
              result += "T";
            }
          }
        } else {
          if (code.startsWith(".")) {
            // Dot branch
            if (code.startsWith("..")) {
              // Dot-dot branch
              if (code.startsWith("...")) {
                // Dot-dot-dot branch
                if (code.startsWith("....")) {
                  result += "H";
                } else {
                  if (code.startsWith("...-")) {
                    result += "V";
                  } else {
                    result += "S";
                  }
                }
              } else {
                if (code.startsWith("..-")) {
                  // Dot-dot-dash branch
                  if (code.startsWith("..-.")) {
                    result += "F";
                  } else {
                    result += "U";
                  }
                } else {
                  result += "I";
                }
              }
            } else {
              if (code.startsWith(".-")) {
                // Dot-dash branch
                if (code.startsWith(".--")) {
                  // Dot-dash-dash branch
                  if (code.startsWith(".---")) {
                    result += "J";
                  } else {
                    if (code.startsWith(".--.")) {
                      result += "P";
                    } else {
                      result += "W";
                    }
                  }
                } else {
                  if (code.startsWith(".-.")) {
                    // Dot-dash-dot branch
                    if (code.startsWith(".-..")) {
                      result += "L";
                    } else {
                      result += "R";
                    }
                  } else {
                    result += "A";
                  }
                }
              } else {
                result += "E";
              }
            }
          } else {
            result += code; // Keep unknown codes as is
          }
        }
      }
    }
  }

  return result;
}
