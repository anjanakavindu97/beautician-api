module.exports = function(app) {
    const {Auth} = require('../middleware/auth');
    const {Beautician} = require('../middleware/beautician');

    const BeauticianController = require('../controllers/BeauticianControllers');

    app.post("/create_service_tag",[Auth, Beautician], BeauticianController.createServiceTag);
    app.get("/service_tags", [Auth, Beautician], BeauticianController.getServiceTags);
    app.post("/create_service", [Auth, Beautician], BeauticianController.createService);
    app.get("/services", [Auth, Beautician], BeauticianController.getAllServices);
    app.get("/service/:id", [Auth, Beautician], BeauticianController.getServiceById);
    app.put("/update_service/:id", [Auth, Beautician], BeauticianController.updateService);
    app.delete("/delete_service/:id", [Auth, Beautician], BeauticianController.deleteService);

}