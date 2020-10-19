const Job = require('../../db/models/job');
const UserJobsSchema = require('../../db/models/userjobs');

getAllJobs = async (req, res, next) => {
  try {
    const isManager = req.user.role === 'MNG';
    let findQuery = { createdBy: req.user._id };
    if (!isManager) {
      findQuery = { active: true };
    }
    const jobs = await Job.find(findQuery, 'projectName technologies jobRole');
    res.status(200).send(jobs);
  } catch (e) {
    next(e);
  }
};

getJobById = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const isManager = req.user.role === 'MNG';
    let findQuery = { _id: jobId };
    if (!isManager) {
      findQuery = { _id: jobId, active: true };
    }
    const job = await Job.findOne(findQuery);
    res.status(200).json(job || {});
  } catch (e) {
    next(e);
  }
};

saveJob = async (req, res, next) => {
  try {
    const requestedjob = Object.assign({}, req.body, {
      createdBy: req.user._id,
    });
    const job = new Job(requestedjob);
    if (!job.isValidated()) {
      res.status(400).send('All parameters are required');
    }

    const savedjob = await job.save();
    res.status(201).send(savedjob);

    res.end();
  } catch (e) {
    next(e);
  }
};

updateJobById = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    if (!jobId || jobId.length === 0) {
      res.status(400).json({ message: 'Id param is missing' });
    }
    const job = new Job(req.body);
    job._id = jobId;

    const dbjob = await Job.findOne({
      _id: jobId,
      createdBy: req.user._id,
    });
    if (!dbjob || dbjob === {}) {
      res.status(400).json({ message: 'Invalid Request' });
      return;
    }
    await Job.findByIdAndUpdate(jobId, job);
    req.body._id = jobId;
    res.status(200).send(req.body);

    res.end();
  } catch (e) {
    next(e);
  }
};

applyForJob = async (req, res, next) => {
  const { jobId } = req.params;
  try {
    const job = await Job.findById(jobId);
    if (job && job.active) {
      const userjob = {
        userId: req.user._id,
        jobId,
      };
      const userjobs = await UserJobsSchema.findOne(userjob);
      if (!userjobs || userjobs === {}) {
        const newJob = new UserJobsSchema(userjob);
        const savedUserjob = await newJob.save();
        console.log({ ...userjobs, isManager }, 'Job applied');
        res.status(201).send({ id: savedUserjob._id, jobId: jobId });
        res.end();
      } else {
        res.status(409).json({ message: 'Already applied for the job' });
        res.end();
      }
    } else {
      res.status(406).json({ message: 'Job is not active' });
    }
  } catch (e) {
    next(e);
  }
};

checkUserJob = async (req, res, next) => {
  const { jobId } = req.params;
  try {
    const job = await Job.findById(jobId);
    if (job && job.active) {
      const userjob = {
        userId: req.user._id,
        jobId,
      };
      const isManager = req.user.role === 'MNG';
      const userjobs = await UserjobsSchema.findOne(userjob);
      if (!userjobs || userjobs === {}) {
        res.status(200).json({ ...userjobs, isManager });
        res.end();
      } else {
        res.status(409).json({ message: 'Already applied for the job' });
        res.end();
      }
    } else {
      res.status(406).json({ message: 'Job is not active' });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllJobs,
  getJobById,
  saveJob,
  updateJobById,
  applyForJob,
  checkUserJob,
};
