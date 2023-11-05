
const express = require('express');
const dbConnection = require("./db/dbConnections");
const logger = require('morgan');
var path = require('path');

const app = express();

app.use(express.json());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
//Cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });
  
 
  //Prueba de conexion de base de datos
  dbConnection.connection.getConnection((err)=>{
    if (err){
      console.log("Error al conectar a la base de datos: "+ err);
    }
    console.log("Conectado exitosamente")
  })

  dbConnection.connection.on("error",(err)=>{
    console.error('Error en la conexión a la base de datos:', err);
  })
  dbConnection.connection.on("close",(err)=>{
    console.log('La conexión a la base de datos se cerró');
  })
  //Conexion a rutas
  require("./route")(app);
  // Redireccion a ruta Bienvenida
  app.get('*', (req, res) => res.status(200).send({
    message: 'Bienvenido, esta es la API Portafolio Andres Morales',
  }));
  // Middleware de manejo de errores
  app.use((err, req, res, next) => {
    console.error(err); // Registrar el error en la consola

    res.status(500).json({
        status: 'error',
        message: 'Ha ocurrido un error en el servidor',
        error: err.message // Enviar el mensaje de error al cliente
    });
  });


module.exports = app;