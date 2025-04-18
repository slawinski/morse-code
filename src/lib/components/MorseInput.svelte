<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    
    export let value: string = '';
    export let isConverting: boolean = false;
    export let animatedValue: string = '';
    
    const dispatch = createEventDispatcher();
    
    let isPlaying = false;
    let waveformData: number[] = Array(40).fill(10);
    let audioContext: AudioContext | null = null;
    let scriptNode: ScriptProcessorNode | null = null;

    function processAudio(e: AudioProcessingEvent) {
        const inputData = e.inputBuffer.getChannelData(0);
        const samples = window.innerWidth <= 480 ? 20 : 60;  // More bars on desktop
        const blockSize = Math.floor(inputData.length / samples);
        
        waveformData = Array.from({ length: samples }, (_, i) => {
            const start = i * blockSize;
            const end = start + blockSize;
            const chunk = inputData.slice(start, end);
            const amplitude = Math.max(...chunk.map(Math.abs));
            // Scale the amplitude to our display range (10-50 pixels)
            return amplitude * 40 + 10;
        });
    }

    async function playMorseSound() {
        if (isPlaying) return;
        isPlaying = true;
        
        // Set initial waveform state to minimum height
        waveformData = Array(40).fill(10);
        
        // Wait for transition to complete before starting audio
        await new Promise(resolve => setTimeout(resolve, 300));
        
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        // Create script processor for audio analysis
        scriptNode = audioContext.createScriptProcessor(2048, 1, 1);
        scriptNode.onaudioprocess = processAudio;
        
        // Connect the audio nodes - make sure to connect to both the script node and destination
        oscillator.connect(gainNode);
        gainNode.connect(scriptNode);
        gainNode.connect(audioContext.destination); // Connect gain directly to destination for sound
        scriptNode.connect(audioContext.destination); // Connect script node to destination for analysis
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        
        const dotDuration = 0.1;
        const dashDuration = dotDuration * 3;
        const symbolGap = dotDuration;
        const letterGap = dotDuration * 3;
        const wordGap = dotDuration * 7;

        let currentTime = audioContext.currentTime;

        for (let i = 0; i < value.length; i++) {
            const char = value[i];
            
            if (char === '.') {
                gainNode.gain.setValueAtTime(0, currentTime);
                gainNode.gain.linearRampToValueAtTime(0.5, currentTime + 0.01);
                gainNode.gain.linearRampToValueAtTime(0, currentTime + dotDuration);
                currentTime += dotDuration + symbolGap;
            } else if (char === '-') {
                gainNode.gain.setValueAtTime(0, currentTime);
                gainNode.gain.linearRampToValueAtTime(0.5, currentTime + 0.01);
                gainNode.gain.linearRampToValueAtTime(0, currentTime + dashDuration);
                currentTime += dashDuration + symbolGap;
            } else if (char === ' ') {
                currentTime += letterGap;
            } else if (char === '/') {
                currentTime += wordGap;
            }
        }

        oscillator.start();
        oscillator.stop(currentTime);
        
        setTimeout(() => {
            isPlaying = false;
            if (scriptNode) {
                scriptNode.disconnect();
                scriptNode = null;
            }
            if (audioContext) {
                audioContext.close();
                audioContext = null;
            }
            waveformData = Array(40).fill(10);
        }, (currentTime - audioContext.currentTime) * 1000);
    }

    function handleInput(event: Event) {
        const target = event.target as HTMLInputElement;
        dispatch('input', target.value);
    }
</script>

<div class="input-group">
    <label for="morse">Morse Code</label>
    <div class="input-with-button">
        <div class="flip-container" class:flipped={isPlaying}>
            <div class="flipper">
                <div class="front">
                    {#if isConverting}
                        <div class="animated-input">
                            <span class="animated-text">{animatedValue}<span class="cursor">|</span></span>
                        </div>
                    {:else}
                        <input
                            type="text"
                            id="morse"
                            {value}
                            on:input={handleInput}
                            placeholder="Enter morse code to convert to text"
                        />
                    {/if}
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

<style>
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
        height: 3.5rem;
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
        width: 6px;
        background: #ffffff;
        margin: 0 2px;
        transition: height 0.02s linear;
    }

    @media (min-width: 481px) {
        .waveform-bar {
            margin: 0 2px;
        }
    }

    .animated-input {
        width: 100%;
        height: 100%;
        padding: 1rem;
        background: #ffffff;
        color: #000000;
        box-shadow: 4px 4px 0 #000000;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        font-family: 'Courier New', monospace;
        font-size: 1rem;
        font-weight: bold;
        overflow: hidden;
    }
    
    .animated-text {
        white-space: pre-wrap;
        word-break: break-all;
    }
    
    .cursor {
        animation: blink 1s step-end infinite;
    }
    
    @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
    }
</style> 