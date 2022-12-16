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