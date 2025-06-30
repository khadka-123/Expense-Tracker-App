const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDb = require('./config/connectDb');

dotenv.config();
const app = express();

const PORT = process.env.PORT || 4000; 
const MONGO_URL = process.env.MONGO_URL;

connectDb(MONGO_URL);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

//user routes
app.use('/api/users',require('./routes/userRoute'))

//transaction routes
app.use('/api/transactions',require('./routes/transactionRoute'))

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`.bgGreen.white);
});
