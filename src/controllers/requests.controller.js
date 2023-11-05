const Request = require("../services/request.services")
const request = new Request()

exports.createRequests = async (req,res,next) => {
    try {
        const {body,sessionUser} = req
            const {newRequest,error} = await request.createRequest({body,sessionUser})
            if(error){
                res.status(401).json({
                    status: "error",
                    message: error
                })
            }else{
                res.status(200).json({
                    status: "success",
                    message: 'Request sent successfully',
                    newRequest
                });
            }
    } catch (error) {
        next(error)
    }
    
}

exports.editRequest = async (req,res,next) => {
    try {
        const requestid = req.params.id
        const {body,sessionUser} = req
        const {error, updateRequest} = await request.editRequest({body,sessionUser,requestid})
        if(error){
            return res.status(401).json({
                message:'error when editing',
                error
            })
        }else{
            return res.status(200).json({
                message:'Edited successfully',
                updateRequest   
            })
        }
        
    } catch (error) {
        next(error)
    }

}

exports.deleteRequest = async (req,res,next) => {
    try {
        const requestid = req.params.id
        const {sessionUser} = req
        const {error,resp} = await request.deleteRequest({sessionUser,requestid})
        if(error){
            return res.status(401).json({
                message:'error when deleting',
                error
            })
        }else{
            return res.status(200).json({
                message:'delete successfully',
                resp   
            })
        }
    } catch (error) {
        next(error)
    }
}

exports.sendRequest = async (req,res,next) => {
    try {
        const {sessionUser} = req
        const idRequest = req.params.id
        const {error,requestList} = await request.sendRequest({sessionUser,idRequest})
        if(error){
            return res.status(401).json({
                message:'error when send request',
                error
            })
        }else{
            return res.status(200).json({
                message:'send request successfully',
                requestList
            })
        }
    } catch (error) {
        next(error)
    }


    
}