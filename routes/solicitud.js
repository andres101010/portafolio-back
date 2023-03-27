const { query } = require('express');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');

express().use(express.json());

const conectBD = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'portafolio'
});


router.get('/', (req,res)=>{
    const {nombre,correo,telefono,solicitud,comentario} = req.body
    const values = [nombre,correo,telefono,solicitud,comentario]
    const sql = 'SELECT * FROM solicitudes'

    conectBD.query(sql,values,(err,result)=>{
        if(err){
            res.status(500).send(err)
        }else if(result.length > 0){
            res.status(200).send(result)
        }else{
            res.status(400).send("No hay solicitudes registradas.")
        }
    }) 
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

 router.put('/editar-solicitud/:idsolicitudes',(req,res)=>{
       const id = req.params.idsolicitudes
       const {nombre,correo,telefono,solicitud,comentario} = req.body
       const sql = `UPDATE solicitudes SET nombre= '${nombre}', correo= '${correo}', telefono= '${telefono}',
       solicitud= '${solicitud}', comentario= '${comentario}' WHERE idsolicitudes = ${id}`
       
       conectBD.query(sql, error =>{
        if(error) throw error
        res.send(`Solicitud con el id ${id}, fue actualizado!`)
       })
 });

 router.delete('/eliminar-solicitud/:idsolicitudes',(req,res)=>{
    const id = req.params.idsolicitudes
    const sql = `DELETE FROM solicitudes WHERE idsolicitudes = ${id}`

    conectBD.query(sql, error =>{
        if(error) throw error
        res.send(`Solicitud con el id ${id}, fue eliminado con exito!`)
    })
 });

module.exports = router;