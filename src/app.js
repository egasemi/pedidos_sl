require('dotenv').config()
const path = require('path');
const express = require('express');
const morgan =  require('morgan');
const mongoose = require('mongoose');

const app = express();

// connecting to db

mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('db connected'))
    .catch(err => console.log(err))

// import routes
const pedidoRoutes = require('./routes/pedido');
const lugarRoutes  = require('./routes/lugar');
const productoRoutes = require('./routes/producto')

// settings
app.set('port', process.env.PORT || 3000);
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');

//middelwares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));

// routes
app.use('/pedido',pedidoRoutes);
app.use('/lugar', lugarRoutes);
app.use('/producto', productoRoutes);

// server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});