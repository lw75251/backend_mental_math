require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

// Routes
const userRoutes = require('./domain/users/user.routes');


const app = express();

app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({
        "message": "Hi"
    })
})

app.use('/user', userRoutes);


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