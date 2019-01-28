export default class JobQueue {
  constructor(dependencies = {}) {
    this._queue = [];
  }

  enqueueJob(pendingJob) {
    const { priority, reservedTime } = pendingJob;
    const jobQueue = this._queue;
    let currentIndex = jobQueue.length - 1;
    let inserted = false;

    while(!inserted) {
      const currentPendingJob = jobQueue[currentIndex];

      if (currentPendingJob.reservedTime === reservedTime && currentPendingJob.priority > priority) {
        const insertPosition = currentIndex + 1;

        jobQueue.splice(insertPosition, 0, pendingJob);
        inserted = true;
      }
      currentIndex -= 1;
    }
  }

  dequeueJob() {
    const jobQueue = this._queue;

    return jobQueue.shift();
  }
};
