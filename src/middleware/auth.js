const jwt = require('jsonwebtoken');
const Users = require('../model/schema');


const auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        const verifyUser = jwt.verify(token , process.env.KEY)
        const UserData = await Users.findOne({_id:verifyUser._id})
        req.token = token;
        req.UserData = UserData;
        next();

    }
    catch(err) {
        res.render('signin', {unauthorisedAcess_msg : "Please Sign in first"});
    }
}

module.exports = auth