const mongoose=require('mongoose')
const TestimonialSchema=new mongoose.Schema({
    testimonee: {
        type: String,
        required:true
    },
    testimonee_title: {
        type: String,
        required:true
    },
    testimonial_content: {
        type: String,
        required:true
    }

},{timestamps:true})
const testimonial = mongoose.model('gallery', TestimonialSchema)


module.exports=testimonial