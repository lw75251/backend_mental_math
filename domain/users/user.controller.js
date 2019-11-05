const User = require('./user.model');

// MongoDB
const initDb = require('../../config/db').initDb;
const getDb = require('../../config/db').getDb;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const TokenUtils = require('../tokens/token.utils');

exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.createUser = async function (req, res) {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        
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
};