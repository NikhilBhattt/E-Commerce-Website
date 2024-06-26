const mongoose = require('mongoose');
const config = require('config');
const dbgr = require('debug')("development:mongoose");

mongoose
    .connect(`${config.get("MONGO_URI")}/scatch`)
    .then(() => {
        dbgr('Database Connected');
    })
    .catch((err) => {
        dbgr(err);
    });

module.exports = mongoose.connection;