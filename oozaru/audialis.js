import Deque from './deque.js';
import preFIX from './prefix.js';
import * as util from './utility.js';
const AudioContext = preFIX('AudioContext');
export class Mixer {
    constructor(sampleRate) {
        this.context = new AudioContext({ sampleRate });
        this.gainer = this.context.createGain();
        this.gainer.gain.value = 1.0;
        this.gainer.connect(this.context.destination);
    }
    get volume() {
        return this.gainer.gain.value;
    }
    set volume(value) {
        this.gainer.gain.value = value;
    }
}
export class Sound {
    constructor(audioElement) {
        this.media = audioElement;
    }
    static async fromFile(url) {
        const media = await util.fetchAudio(url);
        media.loop = true;
        return new this(media);
    }
    get length() {
        return this.media.duration;
    }
    get position() {
        return this.media.currentTime;
    }
    get repeat() {
        return this.media.loop;
    }
    get volume() {
        return this.media.volume;
    }
    set position(value) {
        this.media.currentTime = value;
    }
    set repeat(value) {
        this.media.loop = value;
    }
    set volume(value) {
        this.media.volume = value;
    }
    pause() {
        this.media.pause();
    }
    play(mixer) {
        if (mixer !== this.mixer) {
            this.mixer = mixer;
            if (this.node !== undefined)
                this.node.disconnect();
            this.node = mixer.context.createMediaElementSource(this.media);
            this.node.connect(mixer.gainer);
        }
        this.media.play();
    }
    stop() {
        this.media.pause();
        this.media.currentTime = 0.0;
    }
}
export class Stream {
    constructor(sampleRate, numChannels) {
        this.buffers = new Deque();
        this.inputPtr = 0.0;
        this.mixer = null;
        this.paused = true;
        this.timeBuffered = 0.0;
        this.numChannels = numChannels;
        this.sampleRate = sampleRate;
    }
    get buffered() {
        return this.timeBuffered;
    }
    buffer(data) {
        this.buffers.push(data);
        this.timeBuffered += data.length / (this.sampleRate * this.numChannels);
    }
    pause() {
        this.paused = true;
    }
    play(mixer) {
        this.paused = false;
        if (mixer !== undefined && mixer !== this.mixer) {
            if (this.node !== undefined) {
                this.node.onaudioprocess = null;
                this.node.disconnect();
            }
            this.node = mixer.context.createScriptProcessor(0, 0, this.numChannels);
            this.node.onaudioprocess = (e) => {
                const outputs = [];
                for (let i = 0; i < this.numChannels; ++i)
                    outputs[i] = e.outputBuffer.getChannelData(i);
                if (this.paused || this.timeBuffered < e.outputBuffer.duration) {
                    for (let i = 0; i < this.numChannels; ++i)
                        outputs[i].fill(0.0);
                    return;
                }
                this.timeBuffered -= e.outputBuffer.duration;
                if (this.timeBuffered < 0.0)
                    this.timeBuffered = 0.0;
                const step = this.sampleRate / e.outputBuffer.sampleRate;
                let input = this.buffers.first;
                let inputPtr = this.inputPtr;
                for (let i = 0, len = outputs[0].length; i < len; ++i) {
                    const t1 = Math.floor(inputPtr) * this.numChannels;
                    let t2 = t1 + this.numChannels;
                    const frac = inputPtr % 1.0;
                    if (t2 >= input.length)
                        t2 = t1;
                    for (let j = 0; j < this.numChannels; ++j) {
                        const a = input[t1 + j];
                        const b = input[t2 + j];
                        outputs[j][i] = a + frac * (b - a);
                    }
                    inputPtr += step;
                    if (inputPtr >= Math.floor(input.length / this.numChannels)) {
                        this.buffers.shift();
                        if (!this.buffers.empty) {
                            inputPtr -= Math.floor(input.length / this.numChannels);
                            input = this.buffers.first;
                        }
                        else {
                            for (let j = 0; j < this.numChannels; ++j)
                                outputs[j].fill(0.0, i + 1);
                            return;
                        }
                    }
                }
                this.inputPtr = inputPtr;
            };
            this.node.connect(mixer.gainer);
            this.mixer = mixer;
        }
    }
    stop() {
        if (this.node !== undefined) {
            this.node.onaudioprocess = null;
            this.node.disconnect();
        }
        this.buffers.clear();
        this.inputPtr = 0.0;
        this.mixer = null;
        this.node = undefined;
        this.paused = true;
        this.timeBuffered = 0.0;
    }
}
//# sourceMappingURL=audialis.js.map