const path = require('path');
const express = require('express');
const morgan =  require('morgan');
const mongoose = require('mongoose');

const app = express();

// connecting to db

mongoose.connect('mongodb+srv://egasemi:N2wtrmP3YWEXX0Pl@cluster0.jfaig.mongodb.net/sldb?retryWrites=true&w=majority')
    .then(db => console.log('db connected'))
    .catch(err => console.log(err))

// import routes
const indexRoutes = require('./routes/index')

// settings
app.set('port', process.env.PORT || 3000);
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');

//middelwares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

// routes
app.use('/', indexRoutes);

// server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});