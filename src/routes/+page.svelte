<script lang="ts">
    import { textToMorse } from '$lib/morse1';
    import { morseToText } from '$lib/morse5';
    import Header from '$lib/components/Header.svelte';
    import MorseInput from '$lib/components/MorseInput.svelte';
    import TextInput from '$lib/components/TextInput.svelte';
    import Info from '$lib/components/Info.svelte';
    import { onMount } from 'svelte';

    let textInput = '';
    let morseInput = '';
    let error = '';
    
    // Animation states
    let isConvertingText = false;
    let isConvertingMorse = false;
    let animatedMorseInput = '';
    let animatedTextInput = '';
    let conversionTimeout: number | undefined;

    // Debounce function to prevent too many rapid conversions
    function debounce(func: Function, wait: number) {
        let timeout: number | undefined;
        return function executedFunction(...args: any[]) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Animated text to morse conversion
    function handleTextInput() {
        if (conversionTimeout) clearTimeout(conversionTimeout);
        
        try {
            isConvertingText = true;
            animatedMorseInput = '';
            
            const fullMorseCode = textToMorse(textInput);
            
            let currentIndex = 0;
            const animateNextChar = () => {
                if (currentIndex < fullMorseCode.length) {
                    animatedMorseInput += fullMorseCode[currentIndex];
                    currentIndex++;
                    conversionTimeout = setTimeout(animateNextChar, 100);
                } else {
                    isConvertingText = false;
                    morseInput = fullMorseCode;
                }
            };
            
            animateNextChar();
            error = '';
        } catch (e) {
            error = 'Invalid input';
            isConvertingText = false;
        }
    }

    // Animated morse to text conversion
    function handleMorseInput() {
        if (conversionTimeout) clearTimeout(conversionTimeout);
        
        try {
            isConvertingMorse = true;
            animatedTextInput = '';
            
            const fullText = morseToText(morseInput);
            
            let currentIndex = 0;
            const animateNextChar = () => {
                if (currentIndex < fullText.length) {
                    animatedTextInput += fullText[currentIndex];
                    currentIndex++;
                    conversionTimeout = setTimeout(animateNextChar, 100);
                } else {
                    isConvertingMorse = false;
                    textInput = fullText;
                }
            };
            
            animateNextChar();
            error = '';
        } catch (e) {
            error = 'Invalid morse code';
            isConvertingMorse = false;
        }
    }

    // Debounced handlers to prevent too many rapid conversions
    const debouncedTextInput = debounce(handleTextInput, 300);
    const debouncedMorseInput = debounce(handleMorseInput, 300);

    // Clean up timeouts on component destruction
    onMount(() => {
        return () => {
            if (conversionTimeout) clearTimeout(conversionTimeout);
        };
    });
</script>

<main class="container">
    <Header />
    
    <div class="converter">
        <MorseInput
            value={morseInput}
            isConverting={isConvertingText}
            animatedValue={animatedMorseInput}
            on:input={(e) => {
                morseInput = e.detail;
                debouncedMorseInput();
            }}
        />
        
        <TextInput
            value={textInput}
            isConverting={isConvertingMorse}
            animatedValue={animatedTextInput}
            on:input={(e) => {
                textInput = e.detail;
                debouncedTextInput();
            }}
        />

        {#if error}
            <p class="error">{error}</p>
        {/if}
    </div>

    <Info />
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

    .error {
        color: #ff0000;
        margin-top: 1rem;
        text-align: center;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    /* Add some global styles */
    :global(body) {
        margin: 0;
        background: #ffffff;
    }
</style>
