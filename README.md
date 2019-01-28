# job-manager

job-manager is simple scheduler based on ECMA-262's Job & Job Queue design.

I hope this repository isn't illegal.
If you found some problem, report it to me please.
then I'll check it and consider to remove this repository in github and npm.

## API

> **NOTICE**: dependency of PendingJob is future feature. it is not supported yet.

### Job

### PendingJob(job, \[priority], \[reservedTime], \[dependencies])

### JobQueue(\[dependencies])

### JobManager(\[jobResolver])

#### AddJobQueue(identifier, jobQueue)

#### EnqueueJob(jobQueueIdentifier, pendingJob)
