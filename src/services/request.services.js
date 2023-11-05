const conectBD = require("../db/dbConnections")
const User = require("../services/user.services")
const user = new User()
class Request {
    async createRequest({body,sessionUser}){
        try {
            const {name,email,requests,comment} = body
    
            const verifyEmail = await user.findUser("email",email)

            if(verifyEmail && sessionUser.email != email){
                return {status:false,message:"You must log in"}
            }else{
                const sql = `INSERT INTO requests (name, email, requests, comment, idUser) VALUES ('${name}', '${email}','${requests}','${comment}','${sessionUser.id}')`
                const newRequest = new Promise((resolve, reject) => {
                    conectBD.connection.query(sql,(err,result)=>{
                        if (err){
                            reject(err);
                            }else{
                                resolve(result);
                                }
                    })
                })
                return {newRequest}
            }    
        } catch (error) {
            throw Error(error)
        }
    }

    async editRequest({ body, sessionUser, requestsid }) {
        try {
          const requestIdentify = requestsid;
          const { name, email, telefono, requests, comment } = body;
          const updateFields = [];
            console.log("sessionUser.id",sessionUser.id)
          if (name !== undefined) {
             updateFields.push(`name = '${name}'`);
          }
          if (email !== undefined) {
             updateFields.push(`email = '${email}'`);
          }
          if (telefono !== undefined) {
             updateFields.push(`telefono = '${telefono}'`);
          }
          if (requests !== undefined) {
             updateFields.push(`requests = '${requests}'`);
          }
          if (comment !== undefined) {
             updateFields.push(`comment = '${comment}'`);
          }
          if (updateFields.length === 0) {
            return { status: false, message: 'Nada que editar' };
          }
          else if(sessionUser.id != requestIdentify){
            return {status:false,message:"You must log in"}
          }else{

            const sql = `UPDATE requests SET ${updateFields.join(', ')} WHERE id = ${requestIdentify} AND iduser = ${sessionUser.id}`;

            console.log(sql)
              const updateRequest = await new Promise((resolve, reject) => {
                conectBD.connection.query(sql, (err, result) => {
                  if (err) {
                    reject(err);
                  } else {
                    resolve(result);
                  }
                });
              });
              return { updateRequest };
          }
        } catch (error) {
          throw Error(error);
        }
      }

    
      
      

    async deleteRequest({sessionUser,requestid}){
        try {
            const requestIdentify = requestid
            if(requestIdentify != sessionUser.id ){
                return {status:false,message:"You must log in"}
            }else{
                 const sql = `DELETE FROM requests WHERE id = ${requestIdentify} AND iduser = ${sessionUser.id}`
                 const resp = await new Promise((resolve, reject) => {
                    conectBD.connection.query(sql,(err, result)=>{
                        if(err){
                            reject(err)
                        }else{
                            resolve(result)
                        }
                    })
                })
                return {resp}
            }
        } catch (error) {
            throw Error(error)
        }
    }
    
    async sendRequest({sessionUser,idRequest}){
      try {
        const id = idRequest
        console.log(id)
        const email = sessionUser.email
        console.log(sessionUser.email)
        const verifyEmail = await user.findUser("email",sessionUser.email)
        console.log(verifyEmail)
        if(verifyEmail && sessionUser.email != email){
          return {status:false,message:"You must log in"}
        }else{
           const sql = `SELECT * FROM requests WHERE id = ${id} AND iduser = ${sessionUser.id}`
          const requestList = await new Promise ((resolve,reject)=> {
            conectBD.connection.query(sql, (err, result) => {
              if(err){
                reject(err)
              }else{
                resolve(result)
              }
            }
          )}
          )
          return {requestList}
        }
      } catch (error) {
        throw Error(error)
      }
    }
    
    
    
}

module.exports = Request