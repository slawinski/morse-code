import { createMachine, createActor } from "xstate";

type MorseContext = {
  result: string;
};

type MorseEvent =
  | { type: "DOT" }
  | { type: "DASH" }
  | { type: "SPACE" }
  | { type: "END" };

// Define the state machine configuration
const createMorseStates = () => ({
  idle: {
    on: {
      DOT: { target: "dot" },
      DASH: { target: "dash" },
      SPACE: { target: "idle", actions: "addSpace" },
    },
  },
  dot: {
    on: {
      DOT: { target: "dotDot" },
      DASH: { target: "dotDash" },
      END: { target: "idle", actions: "addE" },
    },
  },
  dash: {
    on: {
      DOT: { target: "dashDot" },
      DASH: { target: "dashDash" },
      END: { target: "idle", actions: "addT" },
    },
  },
  dotDot: {
    on: {
      DOT: { target: "dotDotDot" },
      DASH: { target: "dotDotDash" },
      END: { target: "idle", actions: "addI" },
    },
  },
  dotDash: {
    on: {
      DOT: { target: "dotDashDot" },
      DASH: { target: "dotDashDash" },
      END: { target: "idle", actions: "addA" },
    },
  },
  dashDot: {
    on: {
      DOT: { target: "dashDotDot" },
      DASH: { target: "dashDotDash" },
      END: { target: "idle", actions: "addN" },
    },
  },
  dashDash: {
    on: {
      DOT: { target: "dashDashDot" },
      DASH: { target: "dashDashDash" },
      END: { target: "idle", actions: "addM" },
    },
  },
  dotDotDot: {
    on: {
      DOT: { target: "dotDotDotDot" },
      DASH: { target: "dotDotDotDash" },
      END: { target: "idle", actions: "addS" },
    },
  },
  dotDotDotDot: {
    on: {
      END: { target: "idle", actions: "addH" },
    },
  },
  dotDotDash: {
    on: {
      DOT: { target: "dotDotDashDot" },
      END: { target: "idle", actions: "addU" },
    },
  },
  dotDashDot: {
    on: {
      DOT: { target: "dotDashDotDot" },
      END: { target: "idle", actions: "addR" },
    },
  },
  dotDashDash: {
    on: {
      DOT: { target: "dotDashDashDot" },
      DASH: { target: "dotDashDashDash" },
      END: { target: "idle", actions: "addW" },
    },
  },
  dashDotDot: {
    on: {
      DOT: { target: "dashDotDotDot" },
      DASH: { target: "dashDotDotDash" },
      END: { target: "idle", actions: "addD" },
    },
  },
  dashDotDotDot: {
    on: {
      END: { target: "idle", actions: "addB" },
    },
  },
  dashDotDash: {
    on: {
      DOT: { target: "dashDotDashDot" },
      DASH: { target: "dashDotDashDash" },
      END: { target: "idle", actions: "addK" },
    },
  },
  dashDotDashDot: {
    on: {
      END: { target: "idle", actions: "addC" },
    },
  },
  dashDotDashDash: {
    on: {
      END: { target: "idle", actions: "addY" },
    },
  },
  dashDashDot: {
    on: {
      DOT: { target: "dashDashDotDot" },
      DASH: { target: "dashDashDotDash" },
      END: { target: "idle", actions: "addG" },
    },
  },
  dashDashDotDash: {
    on: {
      END: { target: "idle", actions: "addQ" },
    },
  },
  dashDashDash: {
    on: {
      DOT: { target: "dashDashDashDot" },
      END: { target: "idle", actions: "addO" },
    },
  },
  dashDashDashDot: {
    on: {
      END: { target: "idle", actions: "addQ" },
    },
  },
  dotDotDotDash: {
    on: {
      END: { target: "idle", actions: "addV" },
    },
  },
  dotDotDashDot: {
    on: {
      END: { target: "idle", actions: "addF" },
    },
  },
  dotDashDotDot: {
    on: {
      END: { target: "idle", actions: "addL" },
    },
  },
  dotDashDashDot: {
    on: {
      END: { target: "idle", actions: "addP" },
    },
  },
  dotDashDashDash: {
    on: {
      END: { target: "idle", actions: "addJ" },
    },
  },
  dashDotDotDash: {
    on: {
      END: { target: "idle", actions: "addX" },
    },
  },
  dashDashDotDot: {
    on: {
      END: { target: "idle", actions: "addZ" },
    },
  },
});

// Define all possible actions
const createMorseActions = () => ({
  addSpace: ({ context }: { context: MorseContext }) => {
    context.result += " ";
  },
  addE: ({ context }: { context: MorseContext }) => {
    context.result += "E";
  },
  addT: ({ context }: { context: MorseContext }) => {
    context.result += "T";
  },
  addI: ({ context }: { context: MorseContext }) => {
    context.result += "I";
  },
  addA: ({ context }: { context: MorseContext }) => {
    context.result += "A";
  },
  addN: ({ context }: { context: MorseContext }) => {
    context.result += "N";
  },
  addM: ({ context }: { context: MorseContext }) => {
    context.result += "M";
  },
  addS: ({ context }: { context: MorseContext }) => {
    context.result += "S";
  },
  addH: ({ context }: { context: MorseContext }) => {
    context.result += "H";
  },
  addU: ({ context }: { context: MorseContext }) => {
    context.result += "U";
  },
  addR: ({ context }: { context: MorseContext }) => {
    context.result += "R";
  },
  addW: ({ context }: { context: MorseContext }) => {
    context.result += "W";
  },
  addD: ({ context }: { context: MorseContext }) => {
    context.result += "D";
  },
  addB: ({ context }: { context: MorseContext }) => {
    context.result += "B";
  },
  addK: ({ context }: { context: MorseContext }) => {
    context.result += "K";
  },
  addC: ({ context }: { context: MorseContext }) => {
    context.result += "C";
  },
  addY: ({ context }: { context: MorseContext }) => {
    context.result += "Y";
  },
  addG: ({ context }: { context: MorseContext }) => {
    context.result += "G";
  },
  addQ: ({ context }: { context: MorseContext }) => {
    context.result += "Q";
  },
  addO: ({ context }: { context: MorseContext }) => {
    context.result += "O";
  },
  addV: ({ context }: { context: MorseContext }) => {
    context.result += "V";
  },
  addF: ({ context }: { context: MorseContext }) => {
    context.result += "F";
  },
  addL: ({ context }: { context: MorseContext }) => {
    context.result += "L";
  },
  addP: ({ context }: { context: MorseContext }) => {
    context.result += "P";
  },
  addJ: ({ context }: { context: MorseContext }) => {
    context.result += "J";
  },
  addX: ({ context }: { context: MorseContext }) => {
    context.result += "X";
  },
  addZ: ({ context }: { context: MorseContext }) => {
    context.result += "Z";
  },
});

/**
 * Creates a fresh Morse code machine instance
 */
const createMorseMachine = () => {
  return createMachine(
    {
      id: "morse",
      initial: "idle",
      context: {
        result: "",
      } as MorseContext,
      states: createMorseStates(),
    },
    {
      actions: createMorseActions(),
    }
  );
};

/**
 * Converts Morse code to text using XState
 * @param morse The Morse code to convert to text
 * @returns The text representation of the Morse code
 */
export function morseToText(morse: string): string {
  const actor = createActor(createMorseMachine());
  actor.start();

  // Split the input into words (separated by multiple spaces)
  const words = morse.split(/\s{2,}/);

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    // Process each character in the word
    const chars = word.split(" ");
    for (let j = 0; j < chars.length; j++) {
      const char = chars[j];
      // Process each dot or dash in the character
      for (const symbol of char) {
        switch (symbol) {
          case ".":
            actor.send({ type: "DOT" });
            break;
          case "-":
            actor.send({ type: "DASH" });
            break;
        }
      }
      // Send END after each character
      actor.send({ type: "END" });
    }

    // Add space between words (except after the last word)
    if (i < words.length - 1) {
      actor.send({ type: "SPACE" });
    }
  }

  // Get the final result from the context and clean up
  const result = actor.getSnapshot().context.result;
  actor.stop();
  return result;
}
