// Models
const User = require('../users/user.model');
const GameStat = require('./stats.model');

// Controllers
const userController = require('../users/user.controller');

// MongoDB
const getDb = require('../../config/db').getDb;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const TokenUtils = require('../tokens/token.utils');

exports.createStat = async function( req, res ) {
    const gameStat = new GameStat(req.body);
    if ( !req.body.userId ) {
        return res.status(400).send({
            message: "No user id"
        });
    }

    try {

        // await User.findOneAndUpdate({_id: req.body.userId}, 
        //     {$push:{history: req.body}}, 
        //     function(err) {
        //         if (err ) {
        //             return res.status(400).send(err);
        //         }
        //     }
        // ).then()

        gameStat.save( function(err, gamestat) {
            if (err) return res.status(400).send(err);
            User.findByIdAndUpdate(req.body.userId,
                {$push: {"history": gamestat._id}},
                {new: true},
                function(err){
                    return res.status(500).send(err);
                })
        })
    } catch (err) {
        return res.status(500).send({
            message: "Server Error"
        });
    }
}