import { Job } from "../models/jobSchema.js";
import { JobType } from "../models/jobTypeSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import asyncHandler from 'express-async-handler';

export const createJob = catchAsyncErrors(async (req, res, next) => {

  const { title, description, salary, location, email, Exigences, DateLimite, responsabilites, benefices } = req.body;

  if (!title || !description || !salary || !location || !email || !Exigences || !DateLimite || !responsabilites || !benefices) {
    return next(new ErrorHandler("Remplir tous les champs SVP", 400));
  }

  const newJob = new Job({
    ...req.body,
    images: [],
  });

  if (req.files && req.files.length > 0) {
    req.files.forEach(file => {
      newJob.images.push(`/uploads/${file.filename}`); // Add file paths to the images array
    });
  }

  try {
    await newJob.save();
    res.status(201).json({
      success: true,
      message: "Job créé avec succès",
      event: newJob,
    });
  } catch (error) {
    return next(new ErrorHandler("Erreur lors de la création de travail. Veuillez réessayer.", 500));
  }
});
//Get All Jobs
export const getJobs = async (req, res, next) => {
    try {
             // Retrieve all job from the database

        const jobs = await Job.find();
        
            // Return the events in the response
      res.status(200).json(jobs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

    export const getJobsWithPagination = asyncHandler(async (req, res) => {
        const pageSize = 5; 
        const page = Number(req.query.pageNumber) || 1; 
        const keyword = req.query.keyword ? {
            title: {
                $regex: req.query.keyword,
                $options: 'i' // Insensible à la casse
            }
        } : {};
    
        const jobType = req.query.jobType ? { jobType: req.query.jobType } : {};
    
        const count = await Job.countDocuments({ ...keyword, ...jobType });
            const jobs = await Job.find({ ...keyword, ...jobType })
            .limit(pageSize)
            .skip(pageSize * (page - 1));
            res.json({ success: true, jobs, page, pages: Math.ceil(count / pageSize), count });
    });






     
/**  get job by ID  */


export const getJobById = catchAsyncErrors(async (req, res, next) => {
    //populate() .-->Améliore la performance en effectuant une seule requête pour
     //récupérer à la fois le document principal (Job) et ses documents référencés (JobType et User).
    try {
        const job = await Job.findById(req.params.id).populate('jobType user', 'jobTypeName firstName lastName email');

        if (!job) {
            return next(new ErrorHandler("Aucun emploi trouvé avec cet ID", 404));
        }

        res.status(200).json({
            success: true,
            job
        });
    } catch (error) {
        next(new ErrorHandler("Une erreur s'est produite lors de la récupération de l'emploi", 500));
    }
});







/**  UPDATE  */
export const updateJob = catchAsyncErrors(async (req, res, next) => {
    const { title, description, salary, location, email,jobType } = req.body;
    const jobId = req.params.id;

    if (!title || !description || !salary || !location || !email || !jobType) {
        return next(new ErrorHandler("Remplir tous les champs SVP", 400));
    }

    try {
        const existingJobType = await JobType.findById(jobType);
        if (!existingJobType) {
            return next(new ErrorHandler(`Le type d'emploi spécifié n'existe pas.`, 400));
        }

        const jobToUpdate = await Job.findById(jobId);
        if (!jobToUpdate) {
            return next(new ErrorHandler("Aucun emploi trouvé avec cet ID", 404));
        }  
        if (req.user.role !== 'Admin') {
            return next(new ErrorHandler("Accès refusé. Vous devez être un administrateur pour mettre à jour cet emploi.", 403));
        }
        jobToUpdate.title = title;
        jobToUpdate.description = description;
        jobToUpdate.salary = salary;
        jobToUpdate.location = location;
        jobToUpdate.email = location;
        jobToUpdate.jobType = existingJobType._id;
        const updatedJob = await jobToUpdate.save();

        res.status(200).json({
            success: true,
            job: updatedJob
        });
    } catch (error) {
        next(error);
    }
});




export const showJobs = asyncHandler(async (req, res, next) => {

//job by location 
let locations =[]
const jobByLocation=await Job.find({},{ locations: 1});
jobByLocation.forEach(val => {
    locations.push(val.location)
})
let setUniqueLocation=[... new Set(locations)];
let cat =req.query.cat
let locationFilter = location !== "" ? location :setUniqueLocation




    // Enable search
    const keyword = req.query.keyword ? {
        title: {
            $regex: req.query.keyword,
            $options: 'i' // Insensible à la casse
        }
    } : {};

    // Filter jobs by category IDs
    let ids = [];
    const jobTypeCategory = await JobType.find({}, { _id: 1 });
    jobTypeCategory.forEach(cat => {
        ids.push(cat._id);
    });

    let categ = req.query.cat !== '' ? req.query.cat : ids;

    // Enable pagination
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;
    const count = await Job.find({ ...keyword, jobType: categ , location:locationFilter }).countDocuments();

    try {
        const jobs = await Job.find({ ...keyword, jobType: categ , location:locationFilter})
            .skip(pageSize * (page - 1))
            .limit(pageSize);

        res.status(200).json({
            success: true,
            jobs,
            page,
            pages: Math.ceil(count / pageSize),
            count
        });
    } catch (error) {
        next(error);
    }
});





export const deleteJob = catchAsyncErrors(async (req, res, next) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);

        if (!job) {
            return next(new ErrorHandler("Aucun emploi trouvé avec cet ID", 404));
        }

       
        if (req.user.role !== 'Admin') {
            return next(new ErrorHandler("Accès refusé. Vous devez être un administrateur pour supprimer cet emploi.", 403));
        }

        res.status(200).json({
            success: true,
            message: "Offre d'emploi supprimée avec succès"
        });
    } catch (error) {
      
        next(new ErrorHandler("Une erreur s'est produite lors de la suppression de l'emploi", 500));
    }
});