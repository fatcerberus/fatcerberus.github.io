export async function fetchAudio(url) {
    return new Promise((resolve, reject) => {
        const audio = new Audio();
        audio.onloadedmetadata = () => resolve(audio);
        audio.onerror = () => reject(new Error(`Unable to load audio file '${url}'`));
        audio.src = url;
    });
}
export async function fetchJSON(url) {
    return (await fetch(url)).json();
}
export async function fetchModule(url) {
    const vector = `$moduleNS$${Math.random().toString(32).slice(2)}`;
    const globalThis = window;
    const fullURL = toAbsoluteURL(url);
    const source = `
		import * as module from "${fullURL}";
		window.${vector} = module;
	`;
    const blob = new Blob([source], { type: 'text/javascript' });
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.type = 'module';
        const finishUp = () => {
            delete globalThis[vector];
            script.remove();
            URL.revokeObjectURL(script.src);
        };
        script.onload = () => {
            resolve(globalThis[vector]);
            finishUp();
        };
        script.onerror = () => {
            reject(new Error(`Unable to load JS module '${url}'`));
            finishUp();
        };
        script.src = URL.createObjectURL(blob);
        document.head.appendChild(script);
    });
}
export async function fetchRawFile(url) {
    const fileRequest = await fetch(url);
    return fileRequest.arrayBuffer();
}
export async function fetchScript(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.onload = () => {
            resolve();
            script.remove();
        };
        script.onerror = () => {
            reject(new Error(`Unable to load JS script '${url}'`));
            script.remove();
        };
        script.src = url;
        document.head.appendChild(script);
    });
}
export async function fetchText(url) {
    const fileRequest = await fetch(url);
    return fileRequest.text();
}
export function isConstructor(func) {
    const funcProxy = new Proxy(func, { construct() { return {}; } });
    try {
        Reflect.construct(funcProxy, []);
        return true;
    }
    catch (_a) {
        return false;
    }
}
function toAbsoluteURL(url) {
    const anchor = document.createElement('a');
    anchor.setAttribute("href", url);
    return anchor.cloneNode(false).href;
}
//# sourceMappingURL=utility.js.map