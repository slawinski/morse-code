<script lang="ts">
    import { textToMorse } from '$lib/morse1';
    import { morseToText } from '$lib/morse5';

    let textInput = '';
    let morseInput = '';
    let error = '';
    let isPlaying = false;

    function handleTextInput() {
        try {
            morseInput = textToMorse(textInput);
            error = '';
        } catch (e) {
            error = 'Invalid input';
        }
    }

    function handleMorseInput() {
        try {
            textInput = morseToText(morseInput);
            error = '';
        } catch (e) {
            error = 'Invalid morse code';
        }
    }

    async function playMorseSound() {
        if (isPlaying) return;
        isPlaying = true;

        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        
        const dotDuration = 0.1; // Duration of a dot
        const dashDuration = dotDuration * 3; // Duration of a dash
        const symbolGap = dotDuration; // Gap between symbols
        const letterGap = dotDuration * 3; // Gap between letters
        const wordGap = dotDuration * 7; // Gap between words

        let currentTime = audioContext.currentTime;

        for (let i = 0; i < morseInput.length; i++) {
            const char = morseInput[i];
            
            if (char === '.') {
                // Play dot
                gainNode.gain.setValueAtTime(0, currentTime);
                gainNode.gain.linearRampToValueAtTime(0.5, currentTime + 0.01);
                gainNode.gain.linearRampToValueAtTime(0, currentTime + dotDuration);
                currentTime += dotDuration + symbolGap;
            } else if (char === '-') {
                // Play dash
                gainNode.gain.setValueAtTime(0, currentTime);
                gainNode.gain.linearRampToValueAtTime(0.5, currentTime + 0.01);
                gainNode.gain.linearRampToValueAtTime(0, currentTime + dashDuration);
                currentTime += dashDuration + symbolGap;
            } else if (char === ' ') {
                // Letter gap
                currentTime += letterGap;
            } else if (char === '/') {
                // Word gap
                currentTime += wordGap;
            }
        }

        oscillator.start();
        oscillator.stop(currentTime);
        
        setTimeout(() => {
            isPlaying = false;
        }, (currentTime - audioContext.currentTime) * 1000);
    }
</script>

<main class="container">
    <h1>Morse Code Decoder</h1>
    
    <div class="converter">
        <div class="input-group">
            <label for="morse">Morse Code</label>
            <div class="input-with-button">
                <input
                type="text"
                id="morse"
                bind:value={morseInput}
                on:input={handleMorseInput}
                placeholder="Enter morse code to convert to text"
                />
                <button class="play-button" on:click={playMorseSound} title="Play Morse code">▶️</button>
            </div>
        </div>
        
        <div class="input-group">
            <label for="text">Text</label>
            <input
                type="text"
                id="text"
                bind:value={textInput}
                on:input={handleTextInput}
                placeholder="Enter text to convert to morse code"
            />
        </div>

        {#if error}
            <p class="error">{error}</p>
        {/if}
    </div>

    <div class="info">
        <h2>How to use</h2>
        <ul>
            <li>Enter text in the top input to convert it to Morse code</li>
            <li>Enter Morse code in the bottom input to convert it to text</li>
            <li>Use dots (.) and dashes (-) for Morse code</li>
            <li>Use spaces between letters</li>
            <li>Use forward slash (/) for word spaces</li>
            <li>Click the play button 🔊 to hear the Morse code</li>
        </ul>
    </div>
</main>

<style>
    .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    h1 {
        text-align: center;
        color: #333;
        margin-bottom: 2rem;
    }

    .converter {
        background: #f5f5f5;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .input-group {
        margin-bottom: 1.5rem;
    }

    label {
        display: block;
        margin-bottom: 0.5rem;
        color: #666;
        font-weight: 500;
    }

    .input-with-button {
        position: relative;
        display: flex;
        align-items: center;
    }

    input {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 1rem;
    }

    input:focus {
        outline: none;
        border-color: #4a90e2;
        box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
    }

    .play-button {
        position: absolute;
        right: 0.75rem;
        background: none;
        border: none;
        cursor: pointer;
        font-size: 1.2rem;
        padding: 0.5rem;
        border-radius: 50%;
        transition: transform 0.2s ease;
    }

    .play-button:hover {
        transform: scale(1.1);
    }

    .error {
        color: #dc3545;
        margin-top: 1rem;
        text-align: center;
    }

    .info {
        margin-top: 2rem;
        padding: 1.5rem;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .info h2 {
        color: #333;
        margin-bottom: 1rem;
    }

    .info ul {
        list-style-type: none;
        padding: 0;
    }

    .info li {
        margin-bottom: 0.5rem;
        color: #666;
    }

    .info li:before {
        content: "•";
        color: #4a90e2;
        margin-right: 0.5rem;
    }
</style>
