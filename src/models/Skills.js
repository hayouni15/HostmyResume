const mongoose=require('mongoose')
const SkillsSchema=new mongoose.Schema({
    Skill: {
        type: String,
        required:true
    },
    Proficiency: {
        type: Number,
        required:true

    },
    User_id: {
        type: String,
        required:true
    }


},{timestamps:true})
const Skill = mongoose.model('gallery', SkillsSchema)


module.exports=Skill