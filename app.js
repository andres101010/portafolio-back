
const express = require('express');
const mysql = require('mysql')
const indexRouter = require('./routes/index')
const login = require('./routes/login');
const solicitudRouter = require('./routes/solicitud');
const contacto = require('./routes/contacto');
const app = express();
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

app.use('/', indexRouter)
app.use('/login', login);
app.use('/solicitudes',solicitudRouter);
app.use('/contacto', contacto);

module.exports = app;