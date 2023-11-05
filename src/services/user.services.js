const conectBD = require("../db/dbConnections")
const bcrypt = require('bcrypt');
const generateJwt = require("../middlewares/jwt")
class User {
    async create({ body }) {
        try {
            const { userName, password, email } = body;
            
             const user = await this.findUser("email", email);
            if (user) {
                return { error: "Email already in use" };
            }else{
                const salt = await bcrypt.genSalt(12);
                const secretPassword = await bcrypt.hash(password, salt);
            
            // Ejecutar la consulta SQL para insertar el nuevo usuario
            const newUserInsertResult = await new Promise((resolve, reject) => {
                conectBD.connection.query('INSERT INTO users (userName, password, email) VALUES (?, ?, ?)', [userName, secretPassword, email], (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
    
            // Verificar que la inserción haya tenido éxito
            if (newUserInsertResult && newUserInsertResult.affectedRows === 1) {
                const token = await generateJwt(newUserInsertResult.insertId);
                return { newUser: newUserInsertResult, token };
            } else {
                throw new Error('User creation failed');
            }
            }
                   
        } catch (error) {
            throw new Error(error);
        }
    }
    
    async findUser(field, value) {
        try {
            const sql = `SELECT * FROM users WHERE ${field} = ?`;
            const user = await new Promise((resolve, reject) => {
                conectBD.connection.query(sql,[value], (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results[0]);
                    }
                });
            });
            return user;
        } catch (error) {
            throw new Error(error);
        }
    }
    
    async userLogin({ body }) {
        try {
            const { email, password } = body;
    
            const user = await this.findUser( "email" , email );
    
            if (!user) {
                console.log("User not found");
                return { error: "User not found" };
            }
    
            const isValidPassword = bcrypt.compareSync(password, user.password);
    
            if (!isValidPassword) {
                console.log("Invalid Password");
                return { error: "Invalid Password" };
            }else{
                const token = await generateJwt(user.id);
                delete user.password;
                return { userFound: user, token };
            }
        } catch (error) {
            console.error("Error:", error);
            return { error: error.message };
        }
    }
    
    async recoverPassword({body}){
        try {
            const {newPassword,email} = body
            const verifyEmail = await this.findUser("email",email)
            console.log(verifyEmail)
            if(!verifyEmail){
                console.log("entro aca")
                return {error:"This account does not exist"}
            }else{
                const salt = await bcrypt.genSalt(12);
                const secretPassword = await bcrypt.hash(newPassword, salt);
                const sql = `UPDATE users SET password = '${secretPassword}' WHERE email = '${verifyEmail.email}'`
                console.log(sql)
                const response = await new Promise((resolve, reject) => {
                    conectBD.connection.query(sql,(err,result)=>{
                        if(err){
                            reject(err)
                        }else{
                            resolve(result)
                        }
                    })
                })
                return {response}
            }
        } catch (error) {
            throw Error(error)
        }
    }
}

module.exports = User