import PRIORITIES from './priorities';

export default class PendingJob {
  constructor(job, priority = PRIORITIES.MEDIUM, reservedTime = 0, dependencies = {}) {
    return {
      job,
      priority,
      reservedTime,
      dependencies,
    };
  }
};
