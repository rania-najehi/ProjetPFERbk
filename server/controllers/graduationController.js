// controllers/graduationController.js
import Graduation from '../models/graduation.js';

// Create Graduation
export const createGraduation = async (req, res) => {
    try {
        const graduation = new Graduation(req.body);
        await graduation.save();
        res.status(201).send(graduation);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Read Graduations
export const getGraduations = async (req, res) => {
    try {
        const graduations = await Graduation.find({});
        res.status(200).send(graduations);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Read Graduation by ID
export const getGraduationById = async (req, res) => {
    try {
        const graduation = await Graduation.findById(req.params.id);
        if (!graduation) {
            return res.status(404).send();
        }
        res.status(200).send(graduation);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update Graduation
export const updateGraduation = async (req, res) => {
    try {
        const graduation = await Graduation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!graduation) {

            return res.status(404).send();
        }
        res.status(200).send(graduation);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};

// Delete Graduation
export const deleteGraduation = async (req, res) => {
    try {
        const graduation = await Graduation.findByIdAndDelete(req.params.id);
        if (!graduation) {
            return res.status(404).send();
        }
        res.status(200).send(graduation);
    } catch (error) {
        res.status(500).send(error);
    }
};
