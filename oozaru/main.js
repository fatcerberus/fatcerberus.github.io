import Fido from './fido.js';
import Galileo from './galileo.js';
import InputEngine from './input-engine.js';
import Pegasus from './pegasus.js';
import * as util from './utility.js';
main();
async function main() {
    const urlQuery = new URL(location.href).searchParams;
    const gameID = urlQuery.get('game');
    window.addEventListener('error', e => {
        reportException(e.error);
    });
    window.addEventListener('unhandledrejection', e => {
        reportException(e.reason);
    });
    const canvas = document.getElementById('screen');
    const inputEngine = new InputEngine(canvas);
    await Galileo.initialize(canvas);
    const menu = document.getElementById('menu');
    let useDistDir = true;
    try {
        const gameList = await util.fetchJSON('games/index.json');
        for (const entry of gameList) {
            const iconImage = document.createElement('img');
            iconImage.src = `games/${entry.gameID}/icon.png`;
            iconImage.width = 48;
            iconImage.height = 48;
            const anchor = document.createElement('a');
            anchor.className = 'game';
            if (entry.gameID === gameID)
                anchor.classList.add('running');
            anchor.title = entry.title;
            anchor.href = `${location.origin}${location.pathname}?game=${entry.gameID}`;
            anchor.appendChild(iconImage);
            menu.appendChild(anchor);
        }
        useDistDir = false;
    }
    catch (_a) {
        const iconImage = document.createElement('img');
        iconImage.src = `dist/icon.png`;
        iconImage.width = 48;
        iconImage.height = 48;
        menu.appendChild(iconImage);
    }
    const powerButton = document.getElementById('power');
    const powerText = document.getElementById('power-text');
    if (gameID !== null || useDistDir)
        powerText.classList.add('visible');
    powerButton.onclick = async () => {
        if (powerButton.classList.contains('on')) {
            location.reload();
        }
        else if (gameID !== null || useDistDir) {
            document.body.classList.add('darkened');
            powerButton.classList.toggle('on');
            powerText.classList.remove('visible');
            canvas.focus();
            Pegasus.initialize(new Fido(), inputEngine);
            await Pegasus.launchGame(gameID !== null ? `games/${gameID}` : 'dist');
        }
        else {
            reportException("Please select a game from the top menu first.");
        }
    };
}
function reportException(value) {
    let msg;
    if (value instanceof Error && value.stack !== undefined)
        msg = value.stack.replace(/\r?\n/g, '<br>');
    else
        msg = String(value);
    const readout = document.getElementById('readout');
    readout.classList.add('visible');
    readout.innerHTML = `an error occurred.\r\n\r\n${msg}`;
}
//# sourceMappingURL=main.js.map