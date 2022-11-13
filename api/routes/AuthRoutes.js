module.exports = function(app) {
    const {Auth} = require('..middleware/auth');

    const AuthController = require('../controllers/AuthController');

    app.post("/register", AuthController.registerUser);
}