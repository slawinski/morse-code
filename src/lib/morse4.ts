/**
 * Morse code state machine for decoding
 * This is a more readable approach than nested if-else statements
 */
class MorseStateMachine {
  // Define the states as a tree structure
  private states: Record<string, any> = {
    // Root state
    "": {
      "-": "dash",
      ".": "dot",
      "/": "space",
    },
    // Dash branch
    dash: {
      "-": "dash-dash",
      ".": "dash-dot",
      "": "T", // "-" = T
    },
    // Dot branch
    dot: {
      ".": "dot-dot",
      "-": "dot-dash",
      "": "E", // "." = E
    },
    // Dash-dash branch
    "dash-dash": {
      "-": "dash-dash-dash",
      ".": "dash-dash-dot",
      "": "M", // "--" = M
    },
    // Dash-dot branch
    "dash-dot": {
      ".": "dash-dot-dot",
      "-": "dash-dot-dash",
      "": "N", // "-." = N
    },
    // Dot-dot branch
    "dot-dot": {
      ".": "dot-dot-dot",
      "-": "dot-dot-dash",
      "": "I", // ".." = I
    },
    // Dot-dash branch
    "dot-dash": {
      ".": "dot-dash-dot",
      "-": "dot-dash-dash",
      "": "A", // ".-" = A
    },
    // Dash-dash-dash branch
    "dash-dash-dash": {
      "": "O", // "---" = O
    },
    // Dash-dash-dot branch
    "dash-dash-dot": {
      ".": "dash-dash-dot-dot",
      "-": "dash-dash-dot-dash",
      "": "G", // "--." = G
    },
    // Dash-dash-dot-dash branch
    "dash-dash-dot-dash": {
      "": "Q", // "--.-" = Q
    },
    // Dash-dash-dot-dot branch
    "dash-dash-dot-dot": {
      "": "Z", // "--.." = Z
    },
    // Dash-dot-dot branch
    "dash-dot-dot": {
      ".": "dash-dot-dot-dot",
      "-": "dash-dot-dot-dash",
      "": "D", // "-.." = D
    },
    // Dash-dot-dot-dash branch
    "dash-dot-dot-dash": {
      "": "X", // "-..-" = X
    },
    // Dash-dot-dash branch
    "dash-dot-dash": {
      ".": "dash-dot-dash-dot",
      "-": "dash-dot-dash-dash",
      "": "K", // "-.-" = K
    },
    // Dash-dot-dash-dot branch
    "dash-dot-dash-dot": {
      "": "C", // "-.-." = C
    },
    // Dash-dot-dash-dash branch
    "dash-dot-dash-dash": {
      "": "Y", // "-.--" = Y
    },
    // Dash-dot-dot-dot branch
    "dash-dot-dot-dot": {
      "": "B", // "-..." = B
    },
    // Dot-dot-dot branch
    "dot-dot-dot": {
      ".": "dot-dot-dot-dot",
      "-": "dot-dot-dot-dash",
      "": "S", // "..." = S
    },
    // Dot-dot-dot-dash branch
    "dot-dot-dot-dash": {
      "": "V", // "...-" = V
    },
    // Dot-dot-dash branch
    "dot-dot-dash": {
      ".": "dot-dot-dash-dot",
      "": "U", // "..-" = U
    },
    // Dot-dot-dash-dot branch
    "dot-dot-dash-dot": {
      "": "F", // "..-." = F
    },
    // Dot-dash-dot branch
    "dot-dash-dot": {
      ".": "dot-dash-dot-dot",
      "": "R", // ".-." = R
    },
    // Dot-dash-dot-dot branch
    "dot-dash-dot-dot": {
      "": "L", // ".-.." = L
    },
    // Dot-dash-dash branch
    "dot-dash-dash": {
      ".": "dot-dash-dash-dot",
      "-": "dot-dash-dash-dash",
      "": "W", // ".--" = W
    },
    // Dot-dash-dash-dot branch
    "dot-dash-dash-dot": {
      "": "P", // ".--." = P
    },
    // Dot-dash-dash-dash branch
    "dot-dash-dash-dash": {
      "": "J", // ".---" = J
    },
    // Dot-dot-dot-dot branch
    "dot-dot-dot-dot": {
      "": "H", // "...." = H
    },
    // Space
    space: {
      "": " ", // "/" = space
    },
  };

  /**
   * Decodes a single Morse code character
   * @param code The Morse code to decode
   * @returns The decoded character
   */
  decode(code: string): string {
    if (!code) return "";

    let state = "";
    let result = "";

    // Process each character in the code
    for (let i = 0; i < code.length; i++) {
      const char = code[i];

      // Check if we can transition to a new state
      if (this.states[state] && this.states[state][char]) {
        state = this.states[state][char];
      } else {
        // If we can't transition, the code is invalid
        return code;
      }
    }

    // Get the result from the final state
    if (this.states[state] && this.states[state][""]) {
      result = this.states[state][""];
    } else {
      // If there's no result, the code is invalid
      result = code;
    }

    return result;
  }
}

/**
 * Converts Morse code to text using a state machine
 * @param morse The Morse code to convert to text
 * @returns The text representation of the Morse code
 */
export function morseToText(morse: string): string {
  // Split by single space for letters and multiple spaces for words
  const words = morse.split(/\s{2,}/);
  const stateMachine = new MorseStateMachine();

  return words
    .map((word) =>
      word
        .split(" ")
        .map((code) => stateMachine.decode(code))
        .join("")
    )
    .join(" ");
}
