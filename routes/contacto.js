const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const BD = require('../DB/db.js');
express().use(express.json());

const conectBD = mysql.createConnection({
    host: BD.BD_HOST ,
    user: BD.BD_USER ,
    password: BD.BD_PASSWORD,
    database: BD.BD_NAME 
});

router.post('/crear-solicitud',(req,res)=>{
    const sql = 'INSERT INTO solicitudes SET ?'
    const solicitudObj ={
        nombre: req.body.nombre,
        correo: req.body.correo,
        telefono: req.body.telefono,
        solicitud: req.body.solicitud,
        comentario: req.body.comentario
    }
    conectBD.query(sql,solicitudObj,(err,result)=>{
        if(err) throw err
        res.send("Solicitud agregada con exito!")
    })
 });

 module.exports = router;