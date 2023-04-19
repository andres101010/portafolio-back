const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const BD = require('../DB/db.js');

express().use(express.json());

const conectBD = mysql.createConnection({
    host: BD.BD_HOST,
    user: BD.BD_USER ,
    password: BD.BD_PASSWORD,
    database: BD.BD_NAME
});


router.post('/', (req,res)=>{
    const {User,Password} = req.body
    const values = [User,Password]

    const sql = 'SELECT * FROM login WHERE user = ? and password = ?'

    conectBD.query(sql,values,(err, result) =>{
        if(err){
            res.status(500).send(err)
        }else if(result.length > 0){
            res.status(200).send('El usuario existe!')
        }else{
            res.status(400).send('El usuario no existe!')
        }
    })
});

router.post('/crear-usuario',(req,res)=>{
    const sql = 'INSERT INTO login SET ?'
    const solicitudObj ={
        user: req.body.user,
        password: req.body.password
    }
    conectBD.query(sql,solicitudObj,(err,result)=>{
        if(err) throw err
        res.send(" Agregado con exito!")
    })
 });


module.exports = router;