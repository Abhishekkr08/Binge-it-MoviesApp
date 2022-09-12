const mongoose = require('mongoose');
const DB = process.env.DATABASE;
mongoose.connect(DB)
.then(() => {
    console.log('database connected successfully');
}).catch((err) => {
    console.log(err);
    console.log('database connection failed');
})




// for connecting to localhost mongodb and not on atlas
    // mongoose.connect('mongodb://localhost:27017/Binge-it-db')
