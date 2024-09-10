import mongoose from 'mongoose';

const graduationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    }
});

const Graduation = mongoose.model('Graduation', graduationSchema);
export default Graduation;
