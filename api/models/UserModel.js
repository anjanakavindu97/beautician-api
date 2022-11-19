var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
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
        default: UserRole.CUSTOMER
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

//for comparing the user entered password with database doing loging
UserSchema.methods.comparePassword = function (candidatePassowrd, callBack){
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch){
        if (err) return callBack(err);
        callBack(null, isMatch);
    });
};

//for generating token when loging
UserSchema.methods.generateToken = function (callBack){
    var user = this;
    var token = jwt.sign(user._id.toHexString().process.env.SECRETE);

    callBack(null, token);
};

//validateing token for auth routes middleware
UserSchema.static.findByToken = function (token,callBack){
    jwt.verify(token, process.env.SECRETE, function(err, decode){
        //This decode must give user_id if token is valide .ie decode = user_id
        User.findById.Id(decode, function(err, user){
            if (err){
                resizeBy.json({staus: false, data: "Invalid User ID"});
            }
            callBack(null, user);
        });
    });
};

const User = mongoose.model('User', UserSchema);
module.exports = {User};