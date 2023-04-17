
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const BD = require('../DB/db.js');
express().use(express.json());

const conectBD = mysql.createConnection({
    host: BD.BD_HOST ,
    user: BD.BD_USER ,
    password: BD.BD_PASSWORD ,
    database: BD.BD_NAME 
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

 router.get('/:userId',(req,res)=>{
    const userId = req.params.userId
    const sql = `SELECT * FROM solicitudes WHERE idsolicitudes = ${userId}`

    conectBD.query(sql, (err, result)=>{
        if(err){
            res.status(500).send(err)
        }else if(result.length > 0){
            res.status(200).send(result)
        }else{
            res.status(400).send("Informacion no encontrada")
        }
        
    }) 
 })

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