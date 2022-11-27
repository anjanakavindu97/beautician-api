const { User} = require('../models/UserModel');

exports.registerUser = (req, res) => {
    const user = new User(req.body);

    user.save((err, doc) => {
        if(err) {
            return res.status(422).json({
                success: false,
                message: err.message
            });
        } else {
            return res.status(200).json({
                success: true,
                message: "User registered successfully"
            });
        }
    });
};

exports.loginUser = (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User email not found"
            });
        } else {
            user.comparePassword(req.body.password, (err, isMatch) => {
                if(!isMatch) {
                    return res.status(400).json({
                        success: false,
                        message: "Wrong password"
                    });
                } else {
                    user.generateToken((err, user) => {
                        if(err) {
                            return res.status(400).json({
                                success: false,
                                message: "Unable to generate jwt key!",
                                data: err
                            });
                        } else {
                            return res.status(200).json({
                                success: true,
                                message: "Successfully Logged In!",
                                data : {
                                    "token": user
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};