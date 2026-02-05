window.WebRcadePlayer = class {
    constructor(id) {
        this.container = document.getElementById(id);
    }
    loadFeed(url) {
        // This is the actual code that will start the game
        console.log("Feed triggered: " + url);
        this.container.innerHTML = `
            <div style="padding:20px; color:white;">
                <h2>CORE LOADED</h2>
                <p>Target: ${url}</p>
                <button onclick="window.parent.location.reload()" style="padding:10px;">RESTART SYSTEM</button>
            </div>
        `;
        // In the next step, we will inject the actual .wasm emulator here.
    }
};
