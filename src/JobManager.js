function defaultJobResolver(jobManager) {
  const time = jobManager.time;

  for (const jobQueue of jobManager) {
    const nextReservedTime = jobQueue.nextReservedTime;

    if (time === nextReservedTime) {
      while(time === jobQueue.nextReservedTime) {
        const pendingJob = jobQueue.dequeueJob();
        const job = pendingJob.job;

        job();
      }
    }
  }
}

export default class JobManager {
  constructor(jobResolver = defaultJobResolver) {
    this._jobQueueMap = new Map();
    this.time = 0;

    setTimeout(jobResolver, 0, this);
    setInterval(() => {
      this.time += 10;
      jobResolver(this);
    }, 10);
  }

  addJobQueue(identifier, jobQueue) {
    const jobQueueMap = this._jobQueueMap;

    jobQueueMap.set(identifier, jobQueue);
    return this;
  }

  enqueueJob(jobQueueIdentifier, pendingJob) {
    const jobQueueMap = this._jobQueueMap;
    const jobQueue = jobQueueMap.get(jobQueueIdentifier);

    jobQueue.enqueueJob(pendingJob);
    return this;
  }

  get [Symbol.iterator]() {
    const jobQueueMap = this._jobQueueMap;

    return jobQueueMap[Symbol.iterator];
  }
}
