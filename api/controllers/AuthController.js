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