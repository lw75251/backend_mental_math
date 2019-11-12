// Models
const User = require('../users/user.model').User;
const Review = require('../users/user.model').Review;
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
        gameStat.save( function(err, gamestat) {
            if (err) return res.status(400).send(err);
            User.findByIdAndUpdate(req.body.userId,
                {$push: {"history": gamestat._id}},
                {new: true},
                function(err){
                    return res.status(500).send(err);
                }
            );
        })
    } catch (err) {
        return res.status(500).send({
            message: "Server Error"
        });
    }
}

exports.saveWrong = async function( req, res ) {
    try {
        User.findById(req.params.userId, (err, user) => {
            if(err) return res.status(500).send(err);
            const review = new Review(req.body)
            user.review.push(review);
            user.save().then((user) => res.status(200).send(review));
        });
    } catch (err) {
        return res.status(500).send({
            message: "Server Error"
        });
    }
}