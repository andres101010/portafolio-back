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

router.post('/', (req,res)=>{
    const {user,password} = req.body
    const values = [user,password]

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


module.exports = router;