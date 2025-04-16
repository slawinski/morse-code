<script lang="ts">
    import { textToMorse } from '$lib/morse1';
    import { morseToText } from '$lib/morse5';
    import { fade } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';

    let textInput = '';
    let morseInput = '';
    let error = '';
    let isPlaying = false;
    let waveformData: number[] = [];
    let waveformInterval: number | undefined;

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

    function generateWaveformData(): number[] {
        // Generate random heights for the waveform bars
        return Array.from({ length: 20 }, () => Math.random() * 40 + 10);
    }

    async function playMorseSound() {
        if (isPlaying) return;
        isPlaying = true;
        
        // Initialize waveform data
        waveformData = generateWaveformData();
        
        // Start the waveform animation
        waveformInterval = setInterval(() => {
            waveformData = generateWaveformData();
        }, 100);

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
            if (waveformInterval) clearInterval(waveformInterval);
            waveformData = [];
        }, (currentTime - audioContext.currentTime) * 1000);
    }
</script>

<main class="container">
    <div class="header-container">
        <svg class="header-shape" viewBox="0 0 300 100" preserveAspectRatio="none">
            <path d="M10,10 L290,15 L270,85 L30,95 Z" fill="#ffff00" stroke="#000000" stroke-width="4"/>
        </svg>
        <h1>Morse Code Decoder</h1>
    </div>
    
    <div class="converter">
        <div class="input-group">
            <label for="morse">Morse Code</label>
            <div class="input-with-button">
                <div class="flip-container" class:flipped={isPlaying}>
                    <div class="flipper">
                        <div class="front">
                            <input
                                type="text"
                                id="morse"
                                bind:value={morseInput}
                                on:input={handleMorseInput}
                                placeholder="Enter morse code to convert to text"
                            />
                            <button class="play-button" on:click={playMorseSound} title="Play Morse code">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 5L19 12L8 19V5Z" fill="currentColor" stroke="currentColor" stroke-width="2"/>
                                </svg>
                            </button>
                        </div>
                        <div class="back">
                            <div class="waveform-container">
                                <div class="waveform">
                                    {#each waveformData as height, i}
                                        <div class="waveform-bar" style="height: {height}px;"></div>
                                    {/each}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="input-group">
            <label for="text">Text</label>
            <div class="input-with-button">
                <input
                    type="text"
                    id="text"
                    bind:value={textInput}
                    on:input={handleTextInput}
                    placeholder="Enter text to convert to morse code"
                />
            </div>
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
        font-family: 'Courier New', monospace;
        background: #ffffff;
        position: relative;
        overflow: hidden;
    }

    .container::before {
        content: '';
        position: absolute;
        top: -100px;
        right: -100px;
        width: 300px;
        height: 300px;
        background: #ff3e00;
        transform: rotate(45deg);
        z-index: -1;
    }

    .container::after {
        content: '';
        position: absolute;
        bottom: -150px;
        left: -150px;
        width: 400px;
        height: 400px;
        background: #000000;
        transform: rotate(-15deg);
        z-index: -1;
    }

    .header-container {
        position: relative;
        display: block;
        margin: 0 auto 2rem auto;
        width: 600px;
        height: 150px;
    }

    .header-shape {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    h1 {
        position: relative;
        text-align: center;
        color: #000000;
        margin: 0;
        font-size: 2.5rem;
        text-transform: uppercase;
        letter-spacing: 2px;
        padding: 0;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    .converter {
        background: #ffffff;
        padding: 2rem;
        position: relative;
        border: 4px solid #000000;
    }

    .converter::before {
        content: '';
        position: absolute;
        top: 8px;
        left: 8px;
        right: -8px;
        bottom: -8px;
        background: #ff3e00;
        z-index: -1;
    }

    .input-group {
        margin-bottom: 2rem;
    }

    label {
        display: block;
        margin-bottom: 0.5rem;
        color: #000000;
        font-weight: bold;
        text-transform: uppercase;
        font-size: 0.9rem;
        letter-spacing: 1px;
    }

    .input-with-button {
        position: relative;
        display: flex;
        align-items: center;
        height: 3.5rem; /* Fixed height for the container */
    }
    
    .flip-container {
        width: 100%;
        height: 100%;
        perspective: 1000px;
    }
    
    .flipper {
        position: relative;
        width: 100%;
        height: 100%;
        transition: transform 0.6s;
        transform-style: preserve-3d;
    }
    
    .flipped .flipper {
        transform: rotateX(180deg);
    }
    
    .front, .back {
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
    }
    
    .back {
        transform: rotateX(180deg);
    }
    
    .front {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    input {
        width: 100%;
        padding: 1rem;
        border: none;
        font-family: 'Courier New', monospace;
        font-size: 1rem;
        font-weight: bold;
        background: #ffffff;
        color: #000000;
        box-shadow: 4px 4px 0 #000000;
        height: 100%;
        box-sizing: border-box;
    }

    input:focus {
        outline: none;
        background: #000000;
        color: #ffffff;
        box-shadow: 4px 4px 0 #ff3e00;
    }

    .play-button {
        position: absolute;
        right: 0.75rem;
        top: 50%;
        transform: translateY(-50%);
        background: #ff3e00;
        color: #ffffff;
        border: none;
        cursor: pointer;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        transition: all 0.2s ease;
        box-shadow: 4px 4px 0 #000000;
    }

    .play-button:hover {
        background: #ff3e00;
        color: #ffffff;
        transform: translateY(-50%) translate(2px, 2px);
        box-shadow: 2px 2px 0 #000000;
    }

    .play-button:active {
        transform: translateY(-50%) translate(4px, 4px);
        box-shadow: none;
    }

    .play-button svg {
        width: 24px;
        height: 24px;
    }

    .error {
        color: #ff0000;
        margin-top: 1rem;
        text-align: center;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .waveform-container {
        width: 100%;
        height: 100%;
        background: #000000;
        box-shadow: 4px 4px 0 #000000;
        box-sizing: border-box;
        padding: 0.5rem;
    }

    .waveform {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        height: 100%;
    }

    .waveform-bar {
        width: 8px;
        background: #ffffff;
        margin: 0 2px;
        transition: height 0.1s ease;
    }

    .info {
        margin-top: 2rem;
        padding: 1.5rem;
        background: #ffffff;
        position: relative;
        border: 4px solid #000000;
    }

    .info::before {
        content: '';
        position: absolute;
        top: 8px;
        left: 8px;
        right: -8px;
        bottom: -8px;
        background: #ff3e00;
        z-index: -1;
    }

    .info h2 {
        color: #000000;
        margin-bottom: 1rem;
        text-transform: uppercase;
        letter-spacing: 2px;
        border-bottom: 2px solid #000000;
        padding-bottom: 0.5rem;
    }

    .info ul {
        list-style-type: none;
        padding: 0;
    }

    .info li {
        margin-bottom: 0.75rem;
        color: #000000;
        padding-left: 1.5rem;
        position: relative;
        font-size: 0.9rem;
    }

    .info li:before {
        content: ">";
        color: #000000;
        position: absolute;
        left: 0;
        font-weight: bold;
    }

    /* Add some global styles */
    :global(body) {
        margin: 0;
        background: #ffffff;
    }

    .flip-in {
        animation: flipIn 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        transform-origin: center;
    }
    
    @keyframes flipIn {
        0% {
            transform: rotateX(90deg);
            opacity: 0;
        }
        100% {
            transform: rotateX(0deg);
            opacity: 1;
        }
    }
</style>
