import express, { json } from 'express'
import { compare } from 'bcrypt'

const app = express(json()) 

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
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s'})
}

const users = []

app.get('/users', (req, res) => {
    res.json(users)
})

app.post('/users', async (req, res) => {
    client.connect(err => {
        const collection = client.db("test").collection("devices");
       // perform actions on the collection object
        client.close();
      });

    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const user = { name: req.body.name, password: hashedPassword }

        // SAVE TO DB
        users.push(user)

        res.status(201).send()
    } catch {
        res.status(500).send()
    }
})

app.post('/users/login', (req, res) => {
    // QUERY FROM DB
    const user = users.find(user => user.name = req.body.name)
    
    if ( user == null ) return res.status(400).send("Cannot find user")

    try {
        if ( await compare(req.body.password, user.password) ) {
            res.send("Success")
        }
    } catch {
        res.status(500).send("Not Allowed")
    }
})

let port = 3000
app.listen(port, () => {
    console.log("Server is up and running on port number ${port}")
})