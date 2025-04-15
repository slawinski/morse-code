# Morse Code Decoder Implementations

This directory contains multiple implementations of a Morse code decoder, each demonstrating different approaches and techniques.

## Implementations

### 1. `morse1.ts` - Simple Map-based Implementation

- Uses a simple map to decode Morse code
- Most straightforward implementation
- Good for understanding the basic concept

### 2. `morse2.ts` - Recursive Implementation

- Uses recursion to build the decoded text
- Demonstrates functional programming concepts
- More elegant but potentially harder to understand

### 3. `morse3.ts` - Iterative Implementation

- Uses iteration instead of recursion
- More memory efficient
- Easier to debug and understand

### 4. `morse4.ts` - State Machine Implementation

- Uses a simple state machine pattern
- More structured approach
- Better for handling complex state transitions

### 5. `morse5.ts` - XState Implementation

- Uses the XState library for state management
- Most robust and maintainable implementation
- Properly handles state transitions and cleanup
- Well-organized with separate concerns:
  - State definitions
  - Action definitions
  - Machine creation
  - Text conversion logic

## Testing

All implementations can be tested using the `morse.test.ts` file. The test file includes:

```bash
npm test
```

## Implementation Details

### XState Implementation (morse5.ts)

The XState implementation is the most sophisticated and includes:

1. **Type Definitions**:

   - `MorseContext`: Defines the machine's context (result string)
   - `MorseEvent`: Defines possible events (DOT, DASH, SPACE, END)

2. **State Machine Components**:

   - `createMorseStates()`: Defines all possible states and transitions
   - `createMorseActions()`: Defines actions for adding letters to the result
   - `createMorseMachine()`: Creates a fresh machine instance

3. **Main Function**:
   - `morseToText()`: Converts Morse code to text using the state machine
   - Handles word separation and character processing
   - Properly cleans up resources after use

## Usage

```typescript
import { morseToText } from "./morse5";

// Decode a single letter
console.log(morseToText(".-")); // 'A'

// Decode a word
console.log(morseToText(".... . .-.. .-.. ---")); // 'HELLO'

// Decode multiple words
console.log(morseToText(".... . .-.. .-.. ---   .-- --- .-. .-.. -..")); // 'HELLO WORLD'
```

## Notes

- The XState implementation (morse5.ts) is the recommended version for production use
- Each implementation has its own strengths and use cases
- All implementations pass the same test suite
- The state machine approach (morse4.ts and morse5.ts) is best for handling complex state transitions
