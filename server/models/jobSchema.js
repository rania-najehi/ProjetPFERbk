import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;
const jobSchema = new mongoose.Schema({
   
    title: {
        type: String,
        trim: true,
        maxlength: 70,
    },

    description: {
        type: String,
        trim: true,
    },
    salary: {
        type: String,
        trim: true,
    },
    location: {
        type: String,
    },
   
    email:{
        type:String,
    },
   
    user: {
        type: ObjectId,
        ref: "User",
    },
   
    Exigences:{
        type:String,
    },
    DateLimite:{
        type:String,
    },
    responsabilites:{
        type:String,
    },
    benefices:{
        type:String,
    },
    images: [String],


}, { timestamps: true })

export const Job= mongoose.model("Job",jobSchema);