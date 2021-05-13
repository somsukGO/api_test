const express = require('express');
const morgan = require('morgan');
const userRoute = require('./routes/userRoute');
const dbConnect = require('./configs/database');

const app = express();

dbConnect();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRoute);

app.listen(8858, () => console.log('server started on port: 8858'));
