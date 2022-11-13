var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const UserRole = require('../enums/UserRole');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        maxlength: 100
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6
    },
    role: {
        type: String,
        enum: UserRole,
        default: UserRole.User
    },
    profile_image: {
        type: String,
        required: false
    },
    phone_number: {
        type: Number,
        required: false,
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

//saving user data
UserSchema.pre('save', function(next) {
    var user = this;
    if (user.isModified('password')) {
        //checking if password field is available and modified
        bcrypt.genSalt(10, function(err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = {User};