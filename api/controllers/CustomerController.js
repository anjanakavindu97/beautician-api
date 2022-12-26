const UserRole = require('../enums/UserRole');
const { User } = require('../models/UserModel');
const { Service } = require('../models/ServiceModel');

exports.searchServices = (req, res) => {
    var searchString = req.body.term;

    if(!searchString) {
        return res.status(422).json({
            success: false,
            message: 'Search term is required'
        });
    }

    Service.find({
        $or: [
            { title: { $regex: searchString, $options: 'i' }},
            { description: { $regex: searchString, $options: 'i' }}
        ]
    }, function(err, services) {
        if(err) {
            return res.status(422).json({
                success: false,
                message: 'Error searching services',
                data: err
            });
        }

        return res.status(422).json({
            success: true,
            message: 'Services found',
            data: services
        });
    });
}

exports.viewBeauticianById = async(req, res) => {
    await User.findOne({_id: req.params.id}, (err, beautician) => {
        if(err) {
            return res.status(422).json({
                success: false,
                message: 'Error finding beautician',
                data: err
            });
        }

        if(!beautician) {
            return res.status(422).json({
                success: false,
                message: 'Beautician not found',
            });
        }

        if(beautician.role != UserRole.BEAUTICIAN) {
            return res.status(422).json({
                success: false,
                message: 'User is not a beautician',
            });
        }

        return res.status(422).json({
            success: true,
            message: 'Beautician found',
            data: beautician
        });
    });
}