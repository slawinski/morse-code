import { describe, it, expect } from "vitest";

// Morse code map for all letters
export const MORSE_MAP = {
  ".-": "A",
  "-...": "B",
  "-.-.": "C",
  "-..": "D",
  ".": "E",
  "..-.": "F",
  "--.": "G",
  "....": "H",
  "..": "I",
  ".---": "J",
  "-.-": "K",
  ".-..": "L",
  "--": "M",
  "-.": "N",
  "---": "O",
  ".--.": "P",
  "--.-": "Q",
  ".-.": "R",
  "...": "S",
  "-": "T",
  "..-": "U",
  "...-": "V",
  ".--": "W",
  "-..-": "X",
  "-.--": "Y",
  "--..": "Z",
};

// Function to create test suite for a specific morse implementation
export function createMorseTests(
  morseToText: (morse: string) => string,
  implementationName: string
) {
  describe(`morseToText (${implementationName})`, () => {
    // Test all letters using the map
    it.each(Object.entries(MORSE_MAP))(
      "should decode '%s' to '%s'",
      (morse, expected) => {
        expect(morseToText(morse)).toBe(expected);
      }
    );

    // Test words
    it("should decode words correctly", () => {
      expect(morseToText("... --- ...")).toBe("SOS");
      expect(morseToText(".... . .-.. .-.. ---")).toBe("HELLO");
      expect(morseToText(".-- --- .-. .-.. -..")).toBe("WORLD");
    });

    // Test multiple words
    it("should decode multiple words with spaces correctly", () => {
      expect(morseToText(".... . .-.. .-.. ---   .-- --- .-. .-.. -..")).toBe(
        "HELLO WORLD"
      );
      expect(morseToText("... --- ...   ... --- ...")).toBe("SOS SOS");
    });
  });
}
