const express = require('express')
const router = express.Router()
require('../db/mongoose')
const subscriber = require('../models/Subscriber')
const Pinfo = require('../models/UserInfo')
const auth = require('../middleware/auth')


router.post('/addUser', (req, res) => {
    try {
        const newsubscriber = new subscriber(req.body)
        newsubscriber.generateAuthToken().then((token) => {
            newsubscriber.User_Tokens = token
            newsubscriber.save().then(() => {
                res.send({
                    newsubscriber,
                    token
                })
            }).catch((e) => {
                console.log(e)
                res.send({ 'error': e })
            })
        })


    } catch (e) {
        res.status(400).send({ "resp": "signup failure" })
    }
})

router.post('/login', async (req, res) => {
    try {

        var user = await subscriber.findByCredentials(req.body.User_email, req.body.User_Password)
        console.log(user)
        if (user) {
            user.generateAuthToken().then((token) => {

                user.User_Tokens = token
                user.save().then(() => {
                    res.send({
                        "user": user,
                        "token": token[token.length - 1]
                    })
                }).catch((e) => {
                    console.log(e)
                    res.send(e)
                })

            })
        } else {
            res.send('fail')
        }
    } catch (e) {
        console.log(e)
        res.status(400).send({ "errors": 'Problem logging in' })
    }

})

router.post('/addPinfo/:tid',auth, async (req, res) => {
    var pinfos=req.body
    //console.log(pinfos)
    const user=await subscriber.findOne({'User_Tokens._id': pinfos.User_id})
    pinfos.User_id=user._id
    //console.log(pinfos)
    const pinfo = new Pinfo(pinfos)
    pinfo.save().then(() => {
        res.send({
            pinfo
        })
    }).catch((e) => {
        console.log(e)
        res.send({ 'error': e })
    })

})

module.exports = router