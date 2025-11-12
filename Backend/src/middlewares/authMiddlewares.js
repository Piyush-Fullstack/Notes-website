const jwt = require('jsonwebtoken');
const userModel = require('../models/User');
    
const authMiddleware = async (req,res,next) => {
    const token = req.cookies.token;
    if(!token){
            return res.status(401).json({message : 'Unauthorized, please login'});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await userModel.findById(decoded.id);
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({message : 'Unauthorized, please login'});
    }
}

module.exports = {authMiddleware}