import { priorities, PendingJob, JobQueue, JobManager } from '../';

describe('JobManager', () => {
  it('should sort PendingJobs by it\'s reservedTime', done => {
    const jobManager = new JobManager();
    const mainJobQueue = new JobQueue();
    let flag = false;
    const pendingJobA = new PendingJob(() => flag = true);
    const pendingJobB = new PendingJob(() => flag && done(), priorities.MEDIUM, 100);

    jobManager.addJobQueue(Symbol.for('main'), mainJobQueue);
    jobManager.enqueueJob(Symbol.for('main'), pendingJobB);
    jobManager.enqueueJob(Symbol.for('main'), pendingJobA);
  });

  it('should sort PendingJobs by it\'s priority', done => {
    const jobManager = new JobManager();
    const mainJobQueue = new JobQueue();
    let flag = false;
    const pendingJobA = new PendingJob(() => flag = true, priorities.HIGH);
    const pendingJobB = new PendingJob(() => flag && done());

    jobManager.addJobQueue(Symbol.for('main'), mainJobQueue);
    jobManager.enqueueJob(Symbol.for('main'), pendingJobB);
    jobManager.enqueueJob(Symbol.for('main'), pendingJobA);
  });

  it('should work with multiple Job Queue', () => {

  });
});
