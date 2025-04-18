<script lang="ts">
    // No props needed for now
</script>

<div class="header-container">
    <svg class="header-shape" viewBox="0 0 300 100" preserveAspectRatio="none">
        <path d="M10,10 L290,15 L270,85 L30,95 Z" fill="#ffff00" stroke="#000000" stroke-width="4"/>
    </svg>
    <h1>Morse Code Decoder</h1>
</div>

<style>
    .header-container {
        position: relative;
        display: block;
        margin: 0 auto 2rem auto;
        width: 90%;
        max-width: 600px;
        height: 120px;
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
        font-size: clamp(1.5rem, 5vw, 2.5rem);
        text-transform: uppercase;
        letter-spacing: 2px;
        padding: 0;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    @media (max-width: 480px) {
        .header-container {
            height: 100px;
        }
    }
</style> 