<script lang="ts">
    // No props needed for now
</script>

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

<style>
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

    h2 {
        color: #000000;
        margin-bottom: 1rem;
        text-transform: uppercase;
        letter-spacing: 2px;
        border-bottom: 2px solid #000000;
        padding-bottom: 0.5rem;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        margin-bottom: 0.75rem;
        color: #000000;
        padding-left: 1.5rem;
        position: relative;
        font-size: 0.9rem;
    }

    li:before {
        content: ">";
        color: #000000;
        position: absolute;
        left: 0;
        font-weight: bold;
    }
</style> 