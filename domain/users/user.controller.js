const User = require('./user.model');

// MongoDB
const getDb = require('../../config/db').getDb;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const TokenUtils = require('../tokens/token.utils');

exports.getUser = function (req, res) {
    if(!req.body.uid) {
        return res.status(400).send({
            message: "No UID in Request Body"
        })
    }

    const uid = req.body.uid
    User.findById(uid)
    return res.status(200).send({
        message: "Authenticated. Retrieved User"
    })
}

exports.createUser = async function (req, res) {
    if(!req.body) {
        return res.status(400).send({
            message: "No Request Body"
        });
    }
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        
        const user = new User({
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