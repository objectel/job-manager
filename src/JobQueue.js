class PackedPendingJobs {
  constructor(reservedTime, ...pendingJobs) {
    this.reservedTime = reservedTime;
    this.pendingJobs = pendingJobs;
  }

  insertPendingJob(pendingJob) {
    const pendingJobs = this.pendingJobs;
    let currentIndex = pendingJobs.length - 1;
    let inserted = false;

    while(!inserted) {
      const currentPendingJob = pendingJobs[currentIndex];

      if (currentPendingJob === undefined) {
        pendingJobs.unshift(pendingJob);
        inserted = true;
      } else if (currentPendingJob.priority >= pendingJob) {
        const insertPosition = currentIndex + 1;

        pendingJobs.splice(insertPosition, 0, pendingJob);
        inserted = true;
      }
      currentIndex -= 1;
    }
  }

  get unpack() {
    return this.pendingJobs;
  }
}

export default class JobQueue {
  constructor(dependencies = {}) {
    this._packedPendingJobsQueue = [];
  }

  enqueueJob(pendingJob) {
    const { reservedTime } = pendingJob;
    const packedPendingJobsQueue = this._packedPendingJobsQueue;
    let currentIndex = packedPendingJobsQueue.length - 1;
    let inserted = false;

    while (!inserted) {
      const currentPackedPendingJob = packedPendingJobsQueue[currentIndex];

      if (currentPackedPendingJob === undefined) {
        const packedPendingJobs = new PackedPendingJobs(reservedTime, pendingJob);

        packedPendingJobsQueue.unshift(packedPendingJobs);
        inserted = true;
      } else if (currentPackedPendingJob.reservedTime === reservedTime) {
        currentPackedPendingJob.insertPendingJob(pendingJob);
        inserted = true;
      } else if (currentPackedPendingJob.reservedTime < reservedTime) {
        const packedPendingJobs = new PackedPendingJobs(reservedTime, pendingJob);
        const insertPosition = currentIndex + 1;

        packedPendingJobsQueue.splice(insertPosition, 0 , packedPendingJobs);
        inserted = true;
      }
      currentIndex -= 1;
    }
  }

  dequeueJob() {
    const packedPendingJobsQueue = this._packedPendingJobsQueue;
    const packedPendingJobs = packedPendingJobsQueue[0];
    const pendingJobs = packedPendingJobs.unpack;
    const pendingJob = pendingJobs.shift() || null;

    if (pendingJobs.length === 0) packedPendingJobsQueue.shift();
    return pendingJob;
  }

  get nextReservedTime() {
    const packedPendingJobsQueue = this._packedPendingJobsQueue;
    const packedPendingJobs = packedPendingJobsQueue[0];

    return packedPendingJobsQueue.length ? packedPendingJobs.reservedTime : -1;
  }
};
