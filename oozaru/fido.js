export default class Fido {
    constructor() {
        this.jobs = [];
    }
    async fetch(url) {
        const job = {
            url,
            bytesDone: 0,
            totalSize: null,
            finished: false,
        };
        this.jobs.push(job);
        const response = await fetch(url);
        if (response.body === null)
            throw Error(`Unable to fetch '${url}' (${response.status})`);
        const reader = response.body.getReader();
        const length = response.headers.get('Content-Length');
        if (length !== null)
            job.totalSize = parseInt(length);
        const chunks = [];
        while (!job.finished) {
            const result = await reader.read();
            if (!result.done) {
                chunks.push(result.value);
                job.bytesDone += result.value.length;
            }
            job.finished = result.done;
        }
        let allDone = true;
        for (const job of this.jobs)
            allDone = allDone && job.finished;
        if (allDone)
            this.jobs.length = 0;
        return new Blob(chunks);
    }
    async fetchImage(url) {
        const blob = await this.fetch(url);
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => {
                resolve(image);
                URL.revokeObjectURL(image.src);
            };
            image.onerror = () => {
                reject(new Error(`Unable to load image file '${url}'`));
                URL.revokeObjectURL(image.src);
            };
            image.src = URL.createObjectURL(blob);
        });
    }
    get numJobs() {
        return this.jobs.length;
    }
    get progress() {
        let bytesTotal = 0;
        let bytesDone = 0;
        for (const job of this.jobs) {
            if (job.totalSize === null)
                continue;
            bytesTotal += job.totalSize;
            bytesDone += job.bytesDone;
        }
        return bytesTotal > 0 ? bytesDone / bytesTotal : 1.0;
    }
}
//# sourceMappingURL=fido.js.map