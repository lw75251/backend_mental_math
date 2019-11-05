import express, { json } from 'express'
import jwt from 'jsonwebtoken'
import { compare } from 'bcrypt'

import client from './db'

const app = express()

app.use(express.json())

app.get("/login", (req, res) => {
    // Authenticate User
})

// DEMONSTRATION
let refreshTokens = []

app.post("/token", (req, res) => {
    const refreshToken = req.body.token
    if ( refreshToken == null ) return res.sendStatus(401)
    if ( refreshTokens.includes(refreshToken)) return res.sendStatus(403)

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if ( err ) return res.sendStatus(403)
        const accessToken = generateAccessToken({ name: user.name })
        res.json({ accessToken: accessToken })
    })
})

app.post("/login", (req, res) => {
    // Authenticate User 
    client.connect(err => {
        const collection = client.db("test").collection("tokens");
        
      });

    const username = req.body.username
    const user = { name: username }

    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    // SAVE TO DB
    refreshTokens.push(refreshToken)

    res.json({ accessToken: accessToken, refreshToken: refreshToken })
})

app.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter( token => token !== req.body.token )
    res.sendStatus(204)
})

function authenticateToken( req, res, next ) {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    if ( token == null ) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if ( err ) return res.sendStatus(403)
        req.user = user
        next()
    })
}

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h'})
}

app.listen(4000)