module.exports = function(app) {
    const {Auth} = require('../middleware/auth');
    const {Customer} = require('../middleware/customer');

    const CustomerController = require('../controllers/CustomerController');

    app.get("/beautician/:id", [Auth, Customer], CustomerController.viewBeauticianById);
    app.post("/search_services", [Auth, Customer], CustomerController.searchServices);
}