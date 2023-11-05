const User = require("../services/user.services");
const user = new User();
exports.userLogin = async (req, res, next) => {
    try {
        const body = req.body;
        const { error, userFound, token } = await user.userLogin({ body });

        if (error) {
            res.status(401).json({
                status: "error",
                message: error
            });
        } else {
            res.status(200).json({
                status: "success",
                message: 'Successful login',
                userFound,
                token,
            });
        }
    } catch (error) {
        next(error);
    }
};


exports.create = async (req, res, next) => {
    try {
        const body = req.body;
        const {error, newUser, token } = await user.create({ body });
        if(error){
            res.status(500).json({
                status: "error",
                message: error,
            });
        }else{
            res.status(200).json({
                status: "success",
                message: 'The user has been created',
                newUser,
                token,
            });
        }
    } catch (error) {
        next(error);
    }
    
};

exports.recoverPassword = async (req,res,next) => {
    try {
        const body = req.body
        const {error,response} = await user.recoverPassword({body})
        if(error){
            res.status(500).json({
                message: 'password reset error',
                error
            });
        }else{
            res.status(200).json({
                message: 'Password has been reset',
                response
            });
        }
    } catch (error) {
        next(error)
    }
}