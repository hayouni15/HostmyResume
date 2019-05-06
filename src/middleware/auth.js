const jwt = require('jsonwebtoken')
const Subscriber = require('../models/Subscriber')
const auth = async (req, res, next) => {
    try {
        const tid = req.params.tid // Access the tid provided
       // const TID=mongoose.Types.ObjectId(tid);// convert tid to objectid
       // console.log(tid)
        //const token = req.header('Authorization').replace('Bearer ', '')
        const sub = await Subscriber.findOne({
            'User_Tokens._id': tid
        })
        Tokens=sub.User_Tokens
       //res.send(Tokens)
        const token = Tokens.find( tkn => tkn._id == tid ).token;
       // res.send(token)
       // console.log('tokens',Tokens)
       // console.log('token',token)
        const decoded = jwt.verify(token, 'thisismycode')
        //console.log('decode', decoded._id)
        const subscriber = await Subscriber.findOne({
            _id: decoded._id,
            'User_Tokens.token': token
        })
        //console.log('aaaaaaaaaaa', subscriber)
        if (!subscriber) {
            throw new Error
        }
        req.subscriber = subscriber
        next()
    } catch (e) {
        res.status(400).send('authentication faileed')
    }
}

module.exports = auth