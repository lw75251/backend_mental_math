const User = require('./user.model');

// MongoDB
const getDb = require('../../config/db').getDb;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const TokenUtils = require('../tokens/token.utils');

exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
}

exports.createUser = async function (req, res) {
    if(!req.body) {
        return res.status(400).send({
            message: "No Request Body"
        });
    }
    try {
        const hashedPassword = await bcrypt.hashSync(req.body.password, 10);
        
        const user = new User({
            uid: new mongoose.Types.ObjectId(),
            email: req.body.email,
            name: req.body.name,
            password: hashedPassword,
          });

        user.save();
        res.status(201).json({
            message: "Successfully created User",
            user: user
        });
    
    } catch {
        res.status(500).json({
            message: "Server Error"
        });
    }
}

exports.loginUser = async function (req, res) {

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

    if ( !bcrypt.compareSync(req.body.password, hashedPassword) ) {
        res.status(401).json({
            message: "Invalid Email/Password Combination"
        })
    } else {
        const _db = getDb();
        const authToken = TokenUtils.generateAccessToken(req.body)
        const refreshToken = TokenUtils.generateRefreshToken(req.body)

        _db.db("test").collection("AuthTokens").insertOne({
            "authToken": authToken
        })
        _db.db("test").collection("RefreshTokens").insertOne({
            "refreshToken": refreshToken
        })

        res.status(200).json({
            message: "Successfully Logged In",
            tokens: {
                authToken: authToken,
                refreshToken: refreshToken
            }
        })
    }



}