const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    if(req.method === "OPTIONS"){
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            return res.status(403).json({message: "Unauthorized"})
        }
        const decodedData = jwt.verify(token, config.get('jwtSecret'))
        req.user = decodedData;
        next()
    } catch (err) {
        console.log(err);
        return res.status(403).json({message: "Unauthorized"})
    }
}