/*! coi-serviceworker v0.1.7 | MIT License | https://github.com/gzuidhof/coi-serviceworker */
if (typeof window === "undefined") {
    self.addEventListener("install", () => self.skipWaiting());
    self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));
    self.addEventListener("fetch", (event) => {
        if (event.request.cache === "only-if-cached" && event.request.mode !== "same-origin") return;
        event.respondWith(
            fetch(event.request).then((response) => {
                if (response.status === 0) return response;
                const newHeaders = new Headers(response.headers);
                newHeaders.set("Cross-Origin-Embedder-Policy", "require-corp");
                newHeaders.set("Cross-Origin-Opener-Policy", "same-origin");
                return new Response(response.body, {status: response.status, statusText: response.statusText, headers: newHeaders});
            }).catch((e) => console.error(e))
        );
    });
} else {
    (() => {
        const reloadedBySelf = window.sessionStorage.getItem("coiReloadedBySelf");
        window.sessionStorage.removeItem("coiReloadedBySelf");
        const coi = {
            shouldRegister: () => !reloadedBySelf,
            shouldDeregister: () => false,
            coepCredentialless: () => true,
            coepDegrade: () => true,
            doReload: () => {
                window.sessionStorage.setItem("coiReloadedBySelf", "true");
                window.location.reload();
            },
            quiet: false,
            ...window.coi
        };
        if (coi.shouldDeregister()) {
            navigator.serviceWorker.getRegistrations().then(regs => regs.forEach(reg => reg.unregister()));
        } else if (coi.shouldRegister()) {
            navigator.serviceWorker.register(window.document.currentScript.src).then(reg => {
                reg.addEventListener("updatefound", () => coi.doReload());
                if (window.crossOriginIsolated) return;
                coi.doReload();
            });
        }
    })();
}