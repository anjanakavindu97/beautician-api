const { User } = require("../models/UserModel");
const UserRole = require("../enums/UserRole");

const Beautician = (req, res, next) => {
    let token = req.header("x-access-token") || req.header("authorization");

    if(token){
        if(token.startsWith("Bearer ")){
            token = token.slice(7, token.length);
        }

        User.findByToken(token, (err, user) => {
            if(err) throw err;

            if(user.role !== UserRole.BEAUTICIAN){
                res.status(403).json({
                    success: false,
                    message: "You are not authorized to access this page!"
                });
            }
            next();
        });
    }
};

module.exports = { Beautician };