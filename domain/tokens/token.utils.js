const jwt = require('jsonwebtoken');

class TokenUtils {
    static async authenticateToken( req, res, next ) {
        const authHeader = req.headers["authorization"]
        const token = authHeader && authHeader.split(" ")[1]
        if ( token == null ) return res.sendStatus(401)
    
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if ( err ) return res.sendStatus(403)
            req.user = user
            next()
        })
    }
    
    static generateAccessToken(user) {
        return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s'})
    }
    
    static generateRefreshToken(user) {
        return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "30 days"})
    }
    
}

module.exports = TokenUtils;