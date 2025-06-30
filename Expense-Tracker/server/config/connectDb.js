const mongoose = require('mongoose');
const colors = require('colors');

const connectDb = async (url) => {
    try {
        await mongoose.connect(url); 
        console.log(`Server running on ${mongoose.connection.host}`.bgCyan.white);
    } catch (error) {
        console.log(`${error}`.bgRed);
    }
};

module.exports = connectDb;
