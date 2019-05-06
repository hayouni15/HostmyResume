const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const SubscriberSchema = new mongoose.Schema({
    User_name: {
        type: String,
        required: true
    },
    User_email: {
        type: String,
        required: true,
        unique:true

    },
    User_Password: {
        type: String,
        required: true
    },
    User_Tokens: [{
        token: {
            type: String,
            required: true
        }
    }]


}, {
    timestamps: true
})

// add method to generate tokens
SubscriberSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({
        _id: user._id.toString()
    }, "thisismycode")
    console.log(token)
    user.User_Tokens = user.User_Tokens.concat({
        token
    })
   // await user.save()
    return user.User_Tokens
}


//add static method to log in users by checking them by credentials
SubscriberSchema.statics.findByCredentials = async (email, password) => {

    const user = await subscriber.findOne({
        User_email: email
    })
    if (!user) {
        return {
            error: 'unable to login(user) ',
            data: 'none'
        }
    }

    const ismatch = await bcrypt.compare(password, user.User_Password)
    console.log(user, password, ismatch)
    if (!ismatch) {
        return {
            error: 'unable to login no match',
            data: 'none'
        }
    }
    return user
}
// add pre save midleware
SubscriberSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('User_Password')) {
        user.User_Password = await bcrypt.hash(user.User_Password, 8);
    }
    console.log('pre save', user)
    next()
})
const subscriber = mongoose.model('subscriber', SubscriberSchema)


module.exports = subscriber