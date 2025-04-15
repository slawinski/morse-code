# Morse Code Decoder

A collection of different implementations for decoding Morse code to text, demonstrating various programming approaches and techniques.

## Overview

This project showcases multiple implementations of a Morse code decoder, each using a different programming approach. The implementations range from simple map-based solutions to sophisticated state machine patterns using XState.

## Implementation Details

For detailed information about each implementation, see the [Implementation Details](src/lib/README.md) document.

## Features

- Decode Morse code to text
- Support for all letters (A-Z)
- Support for word separation with spaces
- Multiple implementation approaches
- Comprehensive test suite

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/morse-decoder.git
cd morse-decoder

# Install dependencies
npm install
```

### Running Tests

```bash
npm test
```

## Project Structure

```
morse-decoder/
├── src/
│   ├── lib/
│   │   ├── morse1.ts  # Simple map-based implementation
│   │   ├── morse2.ts  # Recursive implementation
│   │   ├── morse3.ts  # Iterative implementation
│   │   ├── morse4.ts  # State machine implementation
│   │   ├── morse5.ts  # XState implementation
│   │   ├── morse.test.ts  # Test suite
│   │   └── README.md  # Implementation details
│   └── ...
├── package.json
└── README.md
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [XState](https://xstate.js.org/) - State machine library
- [Vitest](https://vitest.dev/) - Testing framework
