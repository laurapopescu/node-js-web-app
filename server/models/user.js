const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../config/secret');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    hash: String,
    salt: String
});

userSchema.methods.setPassword = function(password) { 
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.verifyPassword = function(password) { 
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
}

userSchema.methods.generateJwt = function() { 
    var expiry = new Date(); 
    expiry.setDate(expiry.getDate() + 1);

    return jwt.sign({ 
        _id: this._id,
        email: this.email, 
        name: this.name, 
        exp: parseInt(expiry.getTime() / 1000), 
    }, config.secret);
}

module.exports = mongoose.model('User', userSchema);