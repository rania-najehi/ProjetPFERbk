import express  from "express";
import { createJobType, getAllTypeJob ,updateJobType,deleteJobType} from "../controllers/jobTypeController.js";
import { isAdminAuthenticated,  } from "../middlewares/auth.js";
import { upload } from '../middlewares/multer.js';
import { createJob ,getJobs,getJobById, updateJob,getJobsWithPagination, deleteJob} from "../controllers/jobController.js";
const router =express.Router();


              //TypeJob

router.post("/sendJobType",isAdminAuthenticated,createJobType);
router.get("/getAllTypeJob",getAllTypeJob);
router.put("/updateTypeJobs/:id",  isAdminAuthenticated, updateJobType);
router.delete("/deleteTypeJobs/:id",  isAdminAuthenticated, deleteJobType);



             //Job 

router.post("/createJob",upload.array('images', 5), createJob);
router.get("/getJobs",  getJobs);
router.get("/jobs/:id", getJobById);
router.get("/showJobs", getJobsWithPagination);
router.put("/updateJobs/:id",  isAdminAuthenticated, updateJob);
router.delete('/deleteJob/:id', isAdminAuthenticated, deleteJob);





export default router;