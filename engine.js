/* Multisource Engine Loader */
function loadEngine(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = () => resolve(url);
        script.onerror = () => reject(url);
        document.head.appendChild(script);
    });
}

// These are 3 different "mirrors" of the same engine
const sources = [
    'https://unpkg.com/@webrcade/app-common@1.2.10/dist/index.min.js',
    'https://cdn.jsdelivr.net/npm/@webrcade/app-common@1.2.10/dist/index.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/webrcade-app-common/1.2.10/index.min.js'
];

async function boot() {
    for (const src of sources) {
        try {
            console.log("Trying source: " + src);
            await loadEngine(src);
            window.engineLoaded = true;
            return;
        } catch (e) {
            console.log("Source blocked: " + src);
        }
    }
}
boot();
