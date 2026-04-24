const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]; //Extract token
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET); //Verify token
        req.user = decoded; // req.user will contain userId
        next(); //Pass control to next middleware
    }catch (error) {
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};

module.exports = { protect };