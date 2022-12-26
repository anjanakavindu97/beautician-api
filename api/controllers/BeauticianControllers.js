const { Service } = require("../models/ServiceModel");
const { ServiceTag } = require("../models/ServiceTagModel");

exports.createServiceTag = async (req, res) => {
    var newServiceTag = new ServiceTag(req.body);

    await newServiceTag.save((err, serviceTag) => {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Unable to create service tag!",
                data: err
            });
        } else {
            return res.status(200).json({
                success: true,
                message: "New service tag is created!",
                data: serviceTag
            });
        }
    });
};

exports.getServiceTags = (req, res) => {
    ServiceTag.find(function (err, serviceTags) {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Unable to get service tags!",
                data: err
            });
        } else {
            return res.status(200).json({
                success: true,
                message: "Service tags are retrieved!",
                data: serviceTags
            });
        }
    });
};

exports.createService = async (req, res) => {
    // await ServiceTag.findById(req.body.service_tag, async function (err, serviceTag) {
    //     if (err) {
    //         return res.status(422).json({
    //             success: false,
    //             message: "Invalid service tag ID!"
    //         });
    //     }

    //     if (!serviceTag) {
    //         return res.status(422).json({
    //             success: false,
    //             message: "Invalid service tag ID!"
    //         });
    //     }
        var newService = new Service(req.body);
        newService.beautician = req.user._id;

        await newService.save((err, service) => {
            if (err) {
                return res.status(422).json({
                    success: false,
                    message: "Unable to create service!",
                    data: err
                });
            } else {
                return res.status(200).json({
                    success: true,
                    message: "New service is created!",
                    data: service
                });
            }
        });
    // });
}

exports.getAllServices = (req, res) => {
    Service.find({ beautician: req.user._id }, function (err, services) {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Unable to get services!",
                data: err
            });
        } else {
            return res.status(200).json({
                success: true,
                message: "Services are retrieved!",
                data: services
            });
        }
    });
}

exports.getServiceById = (req, res) => {
    Service.findById(req.params.id, function (err, service) {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Unable to get service!",
                data: err
            });
        } 
        if(!service) {
            return res.status(422).json({
                success: false,
                message: "Invalid service ID!"
            });
        }
        
        return res.status(200).json({
            success: true,
            message: "Service is retrieved!",
            data: service
        });
    });
};

exports.updateService = (req, res) => {
    Service.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true}, function (err, service) {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Unable to update service!",
                data: err
            });
        } 
        if(!service) {
            return res.status(422).json({
                success: false,
                message: "Invalid service ID!"
            });
        }
        
        return res.status(200).json({
            success: true,
            message: "Service is updated!",
            data: service
        });
    });
}

exports.deleteService = (req, res) => {
    Service.findByIdAndRemove(req.params.id, function (err, service) {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Unable to delete service!",
                data: err
            });
        } 
        if(!service) {
            return res.status(422).json({
                success: false,
                message: "Invalid service ID!"
            });
        }
        
        return res.status(200).json({
            success: true,
            message: "Service is deleted!",
            data: service
        });
    });
}