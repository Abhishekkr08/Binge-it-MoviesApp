const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');


const users_Collection_Schema = new mongoose.Schema({

    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'This Email id is already present'],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email id");
            }
        }
    },
    username: {
        type: String,
        required: true,
        unique: [true, 'This Username is already present']
    },
    password: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    emailToken: {
        type : String
    },
    isVerified: {
        type:Boolean
    }
})

// jwt web token generation 
users_Collection_Schema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({_id:this._id.toString()} , process.env.KEY)
        this.tokens = this.tokens.concat({token:token})
        await this.save();
        return token;
    }
    catch(err) {
        console.log(`caught error while generating token --> ${err}`);
        // res.send
    }
}



const Users = new mongoose.model('User', users_Collection_Schema);
module.exports = Users;


