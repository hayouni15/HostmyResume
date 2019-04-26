const mongoose=require('mongoose')
const ExperienceSchema=new mongoose.Schema({
    work_place: {
        type: String,
        required:true
    },
    work_title: {
        type: String,
        required:true
    },
    job_description: {
        type: String,
        required:true
    },
    job_location: {
        type: String,
        required:true
    },
    website: {
        type: String,
        required:true
    },
    start_date: {
        type: String,
        required:true
    },
    end_date: {
        type: String,
        required:true
    }


},{timestamps:true})
const experience = mongoose.model('gallery', ExperienceSchema)


module.exports=experience