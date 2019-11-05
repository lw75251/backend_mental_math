const jwt = require('jsonwebtoken');

class TokenUtils {
    static authenticateToken( req, res, next ) {
        const authHeader = req.headers["authorization"]
        const token = authHeader && authHeader.split(" ")[1]
        if ( token == null ) return res.sendStatus(401)
    
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if ( err ) return res.sendStatus(403)
            req.user = user
            next()
        })
    }
    
    static generateAccessToken(user) {
        return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s'})
    }
    
    static generateRefreshToken(user) {
        return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "30 days"})
    }
    
}