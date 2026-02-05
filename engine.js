async function boot() {
    const script = document.createElement('script');
    script.src = 'webrcade-core.js'; // Points to your new file
    script.onload = () => {
        window.engineLoaded = true;
    };
    document.head.appendChild(script);
}
boot();
