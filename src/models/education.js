const mongoose=require('mongoose')
const EducationSchema=new mongoose.Schema({
    educational_institution: {
        type: String,
        required:true
    },
    degree: {
        type: String,
        required:true
    },
    location: {
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
const education = mongoose.model('gallery', EducationSchema)


module.exports=education