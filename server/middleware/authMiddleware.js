const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError')
const {Token} = require('../models/models');
const tokenService = require('../service/token-service');

module.exports = function(req, res, next){
    try{
        const authorizationHeader = req.headers.authorization;
        if(!authorizationHeader){
            return next(ApiError.UnauthorizedError());
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if(!accessToken){
            return next(ApiError.UnauthorizedError());
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if(!userData){
            return next(ApiError.UnauthorizedError())
        }

        req.user = userData;
        next();
    }catch(e){

    }
}

// module.exports = function(req, res, next){
//     if(req.method === "OPTIONS"){
//         next()
//     }
//     try{
//         const token = req.headers.authorization.split(' ')[1] //Bearer sadafdgsfsasdsda
//         if(!token){
//             return res.status(401).json({message: "Не авторизирован"})
//         }
//         const decoded = jwt.verify(token, process.env.SECRET_KEY)
//         req.uuser = decoded
//         next()
//     }catch(e){
//         return res.status(401).json({message: "Не авторизирован"})
//     }
// };