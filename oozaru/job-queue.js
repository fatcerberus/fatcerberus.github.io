import * as galileo from './galileo.js';
export var JobType;
(function (JobType) {
    JobType[JobType["Render"] = 0] = "Render";
    JobType[JobType["Update"] = 1] = "Update";
    JobType[JobType["Immediate"] = 2] = "Immediate";
})(JobType || (JobType = {}));
let nextJobID = 1;
export default class JobQueue {
    constructor() {
        this.frameCount = -1;
        this.jobs = [];
        this.rafCallback = () => this.animate();
        this.rafID = 0;
        this.sortingNeeded = false;
    }
    add(type, callback, recurring = false, delayOrPriority = 0) {
        const timer = !recurring ? delayOrPriority : 0;
        let priority = recurring ? delayOrPriority : 0.0;
        if (type === JobType.Render)
            priority = -(priority);
        this.jobs.push({
            jobID: nextJobID,
            type,
            callback,
            cancelled: false,
            priority,
            recurring,
            busy: false,
            paused: false,
            timer,
        });
        this.sortingNeeded = true;
        return nextJobID++;
    }
    cancel(jobID) {
        for (let i = 0, len = this.jobs.length; i < len; ++i) {
            const job = this.jobs[i];
            if (job.jobID === jobID)
                job.cancelled = true;
        }
    }
    now() {
        return Math.max(this.frameCount, 0);
    }
    pause(jobID, paused) {
        for (let i = 0, len = this.jobs.length; i < len; ++i) {
            const job = this.jobs[i];
            if (job.jobID === jobID)
                job.paused = paused;
        }
    }
    start() {
        if (this.rafID !== 0)
            return;
        this.rafID = requestAnimationFrame(this.rafCallback);
    }
    stop() {
        if (this.rafID !== 0)
            cancelAnimationFrame(this.rafID);
        this.frameCount = -1;
        this.jobs.length = 0;
        this.rafID = 0;
    }
    animate() {
        this.rafID = requestAnimationFrame(this.rafCallback);
        ++this.frameCount;
        galileo.DrawTarget.Screen.activate();
        galileo.DrawTarget.Screen.unclip();
        galileo.Prim.clear();
        if (this.sortingNeeded) {
            this.jobs.sort((a, b) => {
                const recurDelta = +b.recurring - +a.recurring;
                const typeDelta = a.type - b.type;
                const priorityDelta = b.priority - a.priority;
                const fifoDelta = a.jobID - b.jobID;
                return recurDelta || typeDelta || priorityDelta || fifoDelta;
            });
            this.sortingNeeded = false;
        }
        let ptr = 0;
        const initialLength = this.jobs.length;
        for (let i = 0; i < this.jobs.length; ++i) {
            const job = this.jobs[i];
            if ((i < initialLength || job.type === JobType.Immediate)
                && !job.busy && !job.cancelled && (job.recurring || job.timer-- <= 0)
                && !job.paused) {
                job.busy = true;
                (async () => job.callback())()
                    .then(() => {
                    job.busy = false;
                })
                    .catch(exception => {
                    this.jobs.length = 0;
                    throw exception;
                });
            }
            if (job.cancelled || (!job.recurring && job.timer < 0))
                continue;
            this.jobs[ptr++] = job;
        }
        this.jobs.length = ptr;
    }
}
//# sourceMappingURL=job-queue.js.map