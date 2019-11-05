require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const TokenUtils = require('./domain/tokens/token.utils');

// Routes
const userRoutes = require('./domain/users/user.routes');

// MongoDB
const getDb = require('./config/db').getDb;
const User = require('./domain/users/user.model');

const app = express();

app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

app.post('/login', async (req, res) => {
    if(!req.body.email || !req.body.password) {
        return res.status(400).send({
            message: "Insufficient parameters"
        });
    }

    let hashedPassword;
    await User.findOne({email: req.body.email}, 'password',
        function(err, user) {
        hashedPassword = user.password
        });

    if ( await !bcrypt.compareSync(req.body.password, hashedPassword) ) {
        res.status(401).json({
            message: "Invalid Email/Password Combination"
        })
    } else {
        const _db = getDb();
        const authToken = TokenUtils.generateAccessToken(req.body)
        // const refreshToken = TokenUtils.generateRefreshToken(req.body)

        _db.db("test").collection("AuthTokens").insertOne({
            "authToken": authToken
        })
        // _db.db("test").collection("RefreshTokens").insertOne({
        //     "refreshToken": refreshToken
        // })

        res.status(200).json({
            message: "Successfully Logged In",
            tokens: {
                authToken: authToken,
                // refreshToken: refreshToken
            }
        })
    }
});

app.use('/user', TokenUtils.authenticateToken, userRoutes);


// app.post('/users', async (req, res) => {

//     try {
//         const salt = await bcrypt.genSalt();
//         const hashedPassword = await bcrypt.hash(req.body.password, salt);
        
//         const user = new User({
//             uid: new mongoose.Types.ObjectId(),
//             email: req.body.email,
//             name: req.body.name,
//             password: hashedPassword,
//           });
//         user
//         .save()
//         .catch(err => res.status(400).json({
//             message: "Missing User Information"
//         }));

//         res.status(201).json({
//             message: "Successfully created User",
//             user: user
//         });
    
//     } catch {
//         res.status(500).json({
//             message: "Server Error"
//         });
//     }
    
// })


// app.post("/login", async (req, res) => {
//     // Authenticate User
//     const user = { email: req.body.email, password: req.body.password };
//     const accessToken = TokenUtils.generateAccessToken(user);
//     const refreshToken = TokenUtils.generateRefreshToken(user);

//     // SAVE TO DB
//     refreshTokens.push(refreshToken)
//     res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken })
// })

// app.post('/login', async (req, res) => {

//     const accessToken = generateAccessToken(user)
//     const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)


//     client.connect(err => {
//         const collection = client.db("test").collection("devices");
//        // perform actions on the collection object
//         client.close();
//       });

//     try {
//         const salt = await bcrypt.genSalt()
//         const hashedPassword = await bcrypt.hash(req.body.password, salt)
//         const user = { name: req.body.name, password: hashedPassword }

//         // SAVE TO DB
//         users.push(user)

//         res.status(201).send()
//     } catch {
//         res.status(500).send()
//     }
// })

// app.post('/users/login', (req, res) => {
//     // QUERY FROM DB
//     const user = users.find(user => user.name = req.body.name)
    
//     if ( user == null ) return res.status(400).send("Cannot find user")

//     try {
//         if ( bcrypt.compare(req.body.password, user.password) ) {
//             res.send("Success")
//         }
//     } catch {
//         res.status(500).send("Not Allowed")
//     }
// })

app.listen(PORT, () => {
    console.log(`Server is up and running on port number ${PORT}`)
})