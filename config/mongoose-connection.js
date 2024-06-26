const mongoose = require('mongoose');

const URI = process.env.MONGO_URI || 'mongodb://localhost:27017/Scatch';

mongoose
    .connect(URI)
    .then(() => {
        console.log('Database Connected');
    })
    .catch((err) => {
        console.log(err);
    });

module.exports = mongoose.connection;