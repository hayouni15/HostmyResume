const mongoose = require('mongoose')
const UserInfoSchema = new mongoose.Schema({
    User_id:{
        type: String,
        require: true
    },
    User_name: {
        type: String,
        required: true
    },
    User_email: {
        type: String,
        required: true

    },
    User_phone: {
        type: String,
        required: true
    },
    User_address: {
        type: String,
        required: true
    },
    User_introduction: {
        type: String,
        required: true
    },
    User_objective: {
        type: String,
        required: true
    }


}, { timestamps: true })
const UserInfo = mongoose.model('Personal_information', UserInfoSchema)


module.exports = UserInfo