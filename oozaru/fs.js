import * as util from './utility.js';
export class Game {
    constructor(directoryURL, manifestJSON) {
        const manifest = JSON.parse(manifestJSON);
        this.url = directoryURL.endsWith('/')
            ? directoryURL.substr(0, directoryURL.length - 1)
            : directoryURL;
        this.data = manifest;
        const matches = this.data.resolution.match(/^([0-9]*)x([0-9]*)$/);
        this.screenSize = matches !== null
            ? Object.freeze({ x: +matches[1], y: +matches[2] })
            : Object.freeze({ x: 640, y: 480 });
    }
    static async fromDirectory(url) {
        const json = await util.fetchText(`${url}/game.json`);
        return new this(url, json);
    }
    static urlOf(game, pathName) {
        const hops = pathName.split(/[\\/]+/);
        if (hops[0] !== '@' && hops[0] !== '#' && hops[0] !== '~' && hops[0] !== '$' && hops[0] !== '%')
            hops.unshift('@');
        if (hops[0] === '@') {
            if (game === null)
                throw new Error(`No game loaded to resolve SphereFS '@/' prefix`);
            hops.splice(0, 1);
            return `${game.url}/${hops.join('/')}`;
        }
        else if (hops[0] === '#') {
            hops.splice(0, 1);
            return `assets/${hops.join('/')}`;
        }
        else {
            throw new RangeError(`Unsupported SphereFS prefix '${hops[0]}'`);
        }
    }
    get author() {
        return this.data.author;
    }
    get compiler() {
        return this.data.$COMPILER;
    }
    get modulePath() {
        return this.data.main;
    }
    get manifest() {
        return this.data;
    }
    get resolution() {
        return this.screenSize;
    }
    get summary() {
        return this.data.summary;
    }
    get title() {
        return this.data.name;
    }
    fullPath(pathName, baseDirName = '@/') {
        if (baseDirName !== '@/')
            baseDirName = this.fullPath(`${baseDirName}/`);
        const inputPath = /^[@#~$%](?:\\|\/)/.test(pathName)
            ? `${pathName}`
            : `${baseDirName}/${pathName}`;
        const input = inputPath.split(/[\\/]+/);
        if (input[0] === '$') {
            input.splice(0, 1, ...this.data.main.split(/[\\/]+/).slice(0, -1));
        }
        const output = [input[0]];
        for (let i = 1, len = input.length; i < len; ++i) {
            if (input[i] === '..') {
                if (output.length > 1) {
                    output.pop();
                }
                else {
                    throw new RangeError(`FS sandbox violation on '${pathName}'`);
                }
            }
            else if (input[i] !== '.') {
                output.push(input[i]);
            }
        }
        return output.join('/');
    }
}
//# sourceMappingURL=fs.js.map