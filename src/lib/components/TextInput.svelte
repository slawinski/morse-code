<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    
    export let value: string = '';
    export let isConverting: boolean = false;
    export let animatedValue: string = '';
    
    const dispatch = createEventDispatcher();
    
    function handleInput(event: Event) {
        const target = event.target as HTMLInputElement;
        dispatch('input', target.value);
    }
</script>

<div class="input-group">
    <label for="text">Text</label>
    <div class="input-with-button">
        {#if isConverting}
            <div class="animated-input">
                <span class="animated-text">{animatedValue}<span class="cursor">|</span></span>
            </div>
        {:else}
            <input
                type="text"
                id="text"
                {value}
                on:input={handleInput}
                placeholder="Enter text to convert to morse code"
            />
        {/if}
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