const jwt = require('jsonwebtoken');
const User = require('../services/user.services');
const user = new User();
const { promisify } = require('util');
const { Console } = require('console');
exports.verifyToken = async (req,res,next) => {
    let token;
    const authorization = req.headers.authorization
    if(authorization && authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
        return res.status(401).json({ message: 'No se proporcionó un token JWT.' });
    }
    const {id} = await promisify(jwt.verify)(
        token,
        process.env.SECRET_JWT_SEED
    );
    const userToken = await user.findUser("id",id)
    if (!userToken){
        return res.status(401).json({ message: 'This user is not available' });
    }
    req.sessionUser = userToken;
    console.log(userToken)
    next()
};

exports.verifyAccountOwner = async (req, res, next) => {
    const { sessionUser } = req;
    const { id } = req.params;
    if (id != sessionUser.id) {
        return res.status(401).json({message:'You do not own this account.'})
    }

    next();
};