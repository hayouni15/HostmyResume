const mongoose=require('mongoose')
const PortfolioSchema=new mongoose.Schema({
    link: {
        type: String,
        required:true
    },
    image: {
        type: String,
        required:true
    }

},{timestamps:true})
const portfolio = mongoose.model('gallery', PortfolioSchema)


module.exports=portfolio