const jwt = require('jsonwebtoken')

module.exports = function(req, res, next){
    if(req.method === "OPTIONS"){
        next()
    }
    try{
        const token = req.headers.authorization.split(' ')[1] //Bearer sadafdgsfsasdsda
        if(!token){
            return res.status(401).json({message: "Не авторизирован"})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.uuser = decoded
        next()
    }catch(e){
        return res.status(401).json({message: "Не авторизирован"})
    }
};