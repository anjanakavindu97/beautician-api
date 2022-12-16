module.exports = function(app) {
    const {Auth} = require('../middleware/auth');
    const {Beautician} = require('../middleware/beautician');

    const BeauticianController = require('../controllers/BeauticianControllers');

    app.post("/create_service_tag",[Auth, Beautician], BeauticianController.createServiceTag);
}