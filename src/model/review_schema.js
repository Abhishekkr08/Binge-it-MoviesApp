const mongoose = require('mongoose');


// creation of reviews collection in the database.......
const reviews_collection_Scehma = new mongoose.Schema({
    username: {
        type: String
    },
    date: {
        type : String
    },
    review: {
        type: String
    }
})

const User_Reviews = new mongoose.model('User_Review', reviews_collection_Scehma)
module.exports = User_Reviews;